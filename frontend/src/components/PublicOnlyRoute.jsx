import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import LoadingSpinner from './LoadingSpinner';

/**
 * Route guard component for public-only pages such as Login and Signup.
 *
 * Behavior:
 * 1. Shows a loading spinner while the initial session is being verified.
 * 2. If authenticated, redirects to /dashboard to prevent authenticated users
 *    from being sent back to login or signup.
 * 3. If unauthenticated, renders child components or nested route Outlet.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Optional child elements when used as wrapper.
 */
function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}

export { PublicOnlyRoute };
export default PublicOnlyRoute;
