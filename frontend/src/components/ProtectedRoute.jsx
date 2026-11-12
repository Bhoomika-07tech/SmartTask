import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import LoadingSpinner from './LoadingSpinner';

/**
 * Route guard component that protects private routes from unauthenticated access.
 *
 * Behavior:
 * 1. Shows a loading spinner while the initial session is being verified.
 * 2. If unauthenticated, redirects to /login preserving the intended target in router state.
 * 3. If authenticated, renders child components or nested route Outlet.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Optional child elements when used as wrapper.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}

export { ProtectedRoute };
export default ProtectedRoute;
