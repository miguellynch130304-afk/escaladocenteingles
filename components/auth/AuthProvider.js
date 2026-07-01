import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import { isSupabaseConfigured, supabase } from 'lib/supabaseClient';

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
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
  const isPublicRoute = publicRoutes.includes(router.pathname);

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

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    loading,
    signOut: async () => {
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
  }), [loading, session]);

  if (!isSupabaseConfigured) {
    return <AuthConfigurationScreen />;
  }

  if (loading || (!session && !isPublicRoute) || (session && isPublicRoute)) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
