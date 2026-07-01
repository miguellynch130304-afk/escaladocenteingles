import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from 'lib/supabaseClient';

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

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entitlement, setEntitlement] = useState(null);
  const [accessLoading, setAccessLoading] = useState(true);

  const loadEntitlement = useCallback(async () => {
    if (!supabase || !session?.user?.id) {
      setEntitlement(null);
      setAccessLoading(false);
      return null;
    }

    setAccessLoading(true);

    const { data, error } = await supabase
      .from('user_entitlements')
      .select('user_id, plan, premium_started_at, premium_expires_at')
      .eq('user_id', session.user.id)
      .maybeSingle();

    const nextEntitlement = error || !data
      ? {
          user_id: session.user.id,
          plan: 'free',
          premium_started_at: null,
          premium_expires_at: null
        }
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
        setEntitlement(null);
        setAccessLoading(Boolean(nextSession));
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

  const premiumExpiry = entitlement?.premium_expires_at
    ? new Date(entitlement.premium_expires_at).getTime()
    : 0;
  const isPremium = Boolean(
    session?.user?.id
    && entitlement?.user_id === session.user.id
    && entitlement?.plan === 'premium'
    && premiumExpiry > Date.now()
  );

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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
