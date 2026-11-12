import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { supabase } from '../lib/supabase';
import Button from './Button';
import './Navbar.css';

/**
 * Responsive navigation bar component for SmartTask.
 * Displays branding, navigation links, and dynamic actions based on authentication state:
 * - Unauthenticated: Home, Login links, and Sign Up button.
 * - Authenticated: Home, Dashboard, Profile links, and Logout button with loading and error states.
 *
 * @param {Object} props
 * @param {string} [props.brandName='SmartTask'] - The brand name displayed in the navbar.
 * @param {string} [props.className=''] - Optional additional CSS classes.
 */
function Navbar({ brandName = 'SmartTask', className = '' }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  /**
   * Handles user logout via Supabase Auth.
   * Disables button while pending to prevent duplicate clicks,
   * catches and displays errors, and redirects to /login on success.
   */
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setLogoutError('');
    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLogoutError(error.message);
        return;
      }

      closeMenu();
      navigate('/login');
    } catch (err) {
      setLogoutError(
        err.message || 'An unexpected error occurred during logout. Please try again.'
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav
      className={`navbar ${className}`.trim()}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {/* SmartTask Brand Link */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </span>
          <span className="navbar-brand-text">{brandName}</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className="navbar-link" onClick={closeMenu}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="navbar-link" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link to="/profile" className="navbar-link" onClick={closeMenu}>
                  Profile
                </Link>
              </>
            ) : (
              <Link to="/login" className="navbar-link" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>

          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="navbar-auth-actions">
                <Button
                  variant="outline"
                  className="navbar-btn-logout"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  aria-busy={isLoggingOut}
                >
                  {isLoggingOut ? 'Logging out...' : 'Log Out'}
                </Button>
                {logoutError && (
                  <div className="navbar-error" role="alert">
                    {logoutError}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                className="btn btn-primary navbar-btn-signup"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
export default Navbar;
