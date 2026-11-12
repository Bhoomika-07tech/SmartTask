import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext } from './AuthContext';

/**
 * AuthProvider component that manages authentication state across the application.
 *
 * Responsibilities:
 * - Retrieves existing session on app startup via supabase.auth.getSession().
 * - Listens for authentication changes via supabase.auth.onAuthStateChange().
 * - Cleans up the auth subscription when unmounted.
 * - Provides user, session, loading, and isAuthenticated state to consumers.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Retrieve the existing session on application startup
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error retrieving initial session:', error.message);
        }
        if (isMounted) {
          setSession(data?.session ?? null);
          setUser(data?.session?.user ?? null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Unexpected error during session initialization:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // 2. Listen for auth changes (sign in, sign out, token refresh, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession ?? null);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    // 3. Clean up the listener when the provider unmounts
    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    loading,
    isAuthenticated: Boolean(session),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
