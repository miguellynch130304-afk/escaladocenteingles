import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { isSupabaseConfigured, supabase } from 'lib/supabaseClient';

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
  accessLoading: true,
  entitlement: null,
  isPremium: false,
  refreshEntitlement: async () => null,
  signOut: async () => {}
});

const publicRoutes = ['/authentication/sign-in'];

const getSafeDestination = (value) => {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) {
    return '/';
  }

  return value.startsWith('/authentication/') ? '/' : value;
};

export const useAuth = () => useContext(AuthContext);

const AuthLoadingScreen = ({ message = 'Checking your access...' }) => (
  <div className="auth-gate-screen">
    <div>
      <Spinner animation="border" variant="primary" />
      <strong>{message}</strong>
    </div>
  </div>
);

const AuthConfigurationScreen = () => (
  <div className="auth-gate-screen">
    <div className="auth-config-message">
      <span><i className="fe fe-shield"></i></span>
      <h1>Authentication setup required</h1>
      <p>Add the Supabase public environment variables before opening the application.</p>
    </div>
  </div>
);

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entitlement, setEntitlement] = useState(null);
  const [accessLoading, setAccessLoading] = useState(true);
  const isPublicRoute = publicRoutes.includes(router.pathname);

  const loadEntitlement = useCallback(async () => {
    if (!supabase || !session?.user?.id) {
      setEntitlement(null);
      setAccessLoading(false);
      return null;
    }

    setAccessLoading(true);

    const { data, error } = await supabase
      .from('user_entitlements')
      .select('plan, premium_started_at, premium_expires_at')
      .eq('user_id', session.user.id)
      .maybeSingle();

    const nextEntitlement = error || !data
      ? { plan: 'free', premium_started_at: null, premium_expires_at: null }
      : data;

    setEntitlement(nextEntitlement);
    setAccessLoading(false);
    return nextEntitlement;
  }, [session?.user?.id]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadEntitlement();
  }, [loadEntitlement]);

  useEffect(() => {
    if (!router.isReady || loading || !isSupabaseConfigured) {
      return;
    }

    if (!session && !isPublicRoute) {
      const next = router.asPath && router.asPath !== '/'
        ? `?next=${encodeURIComponent(router.asPath)}`
        : '';
      router.replace(`/authentication/sign-in${next}`);
      return;
    }

    if (session && isPublicRoute) {
      router.replace(getSafeDestination(router.query.next));
    }
  }, [isPublicRoute, loading, router, session]);

  const premiumExpiry = entitlement?.premium_expires_at
    ? new Date(entitlement.premium_expires_at).getTime()
    : 0;
  const isPremium = entitlement?.plan === 'premium' && premiumExpiry > Date.now();

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    loading,
    accessLoading,
    entitlement,
    isPremium,
    refreshEntitlement: loadEntitlement,
    signOut: async () => {
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
  }), [accessLoading, entitlement, isPremium, loadEntitlement, loading, session]);

  if (!isSupabaseConfigured) {
    return <AuthConfigurationScreen />;
  }

  if (
    loading
    || (session && accessLoading && !isPublicRoute)
    || (!session && !isPublicRoute)
    || (session && isPublicRoute)
  ) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
