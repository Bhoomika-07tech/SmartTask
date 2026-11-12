import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Custom hook to access authentication state and session information.
 *
 * @returns {{
 *   session: import('@supabase/supabase-js').Session | null,
 *   user: import('@supabase/supabase-js').User | null,
 *   loading: boolean,
 *   isAuthenticated: boolean
 * }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
