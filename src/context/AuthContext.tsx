import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, requireSupabase, supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  /** True while the initial session lookup is still running. */
  loading: boolean;
  signingIn: boolean;
  signingOut: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Supabase Auth session holder used to gate the gallery admin panel.
 * The admin account is created manually in Supabase (see the SQL script);
 * this app never exposes a sign-up flow.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          console.error('[Auth] Could not restore the session', error);
        }
        if (active) {
          setSession(data?.session ?? null);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('[Auth] Unexpected error restoring the session', error);
        if (active) setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const client = requireSupabase();
    setSigningIn(true);
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        console.error('[Auth] Sign-in failed', { email: email.trim(), error });
        throw new Error(error.message);
      }

      setSession(data.session);
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const client = requireSupabase();
    setSigningOut(true);
    try {
      const { error } = await client.auth.signOut();
      if (error) {
        console.error('[Auth] Sign-out failed', error);
        throw new Error(error.message);
      }
      setSession(null);
    } finally {
      setSigningOut(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signingIn,
        signingOut,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
