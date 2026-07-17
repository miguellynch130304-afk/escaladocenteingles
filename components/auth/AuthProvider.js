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
  const [authReady, setAuthReady] = useState(false);
  const [authRevision, setAuthRevision] = useState(0);
  const [entitlement, setEntitlement] = useState(null);
  const [accessLoading, setAccessLoading] = useState(true);

  const buildFreeEntitlement = useCallback((userId) => ({
    user_id: userId,
    plan: 'free',
    premium_started_at: null,
    premium_expires_at: null
  }), []);

  const loadEntitlement = useCallback(async () => {
    if (!authReady) {
      return null;
    }

    if (!supabase || !session?.user?.id) {
      setEntitlement(null);
      setAccessLoading(false);
      return null;
    }

    setAccessLoading(true);

    const userId = session.user.id;
    let nextEntitlement = buildFreeEntitlement(userId);

    try {
      const entitlementRequest = supabase
        .from('user_entitlements')
        .select('user_id, plan, premium_started_at, premium_expires_at')
        .eq('user_id', userId)
        .maybeSingle();

      const timeoutFallback = new Promise((resolve) => {
        globalThis.setTimeout(() => {
          resolve({ data: null, error: new Error('Entitlement request timed out') });
        }, 8000);
      });

      const { data, error } = await Promise.race([entitlementRequest, timeoutFallback]);

      if (!error && data) {
        nextEntitlement = data;
      }
    } catch (_error) {
      nextEntitlement = buildFreeEntitlement(userId);
    }

    setEntitlement(nextEntitlement);
    setAccessLoading(false);
    return nextEntitlement;
  }, [authReady, buildFreeEntitlement, session?.user?.id]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setAuthReady(true);
      setAccessLoading(false);
      return undefined;
    }

    let active = true;

    const bootstrapTimeout = globalThis.setTimeout(() => {
      if (active) {
        setLoading(false);
        setAuthReady(true);
        setAccessLoading(false);
        setAuthRevision((current) => current + 1);
      }
    }, 5000);

    supabase.auth.getSession()
      .then(({ data }) => {
        if (active) {
          globalThis.clearTimeout(bootstrapTimeout);
          setAccessLoading(Boolean(data.session));
          setSession(data.session);
          setLoading(false);
          setAuthReady(true);
          setAuthRevision((current) => current + 1);
        }
      })
      .catch(() => {
        if (active) {
          globalThis.clearTimeout(bootstrapTimeout);
          setSession(null);
          setLoading(false);
          setAuthReady(true);
          setAccessLoading(false);
          setAuthRevision((current) => current + 1);
        }
      });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setEntitlement(null);
        setAccessLoading(Boolean(nextSession));
        setSession(nextSession);
        setLoading(false);
        setAuthReady(true);
        globalThis.clearTimeout(bootstrapTimeout);
        setAuthRevision((current) => current + 1);
      }
    });

    return () => {
      active = false;
      globalThis.clearTimeout(bootstrapTimeout);
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadEntitlement();
  }, [authRevision, loadEntitlement]);

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
