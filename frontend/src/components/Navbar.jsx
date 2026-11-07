import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * Responsive navigation bar component for SmartTask.
 * Displays branding, navigation links (Home, Login, Sign Up) using React Router Link,
 * and collapses into a responsive mobile menu on smaller screens.
 *
 * @param {Object} props
 * @param {string} [props.brandName='SmartTask'] - The brand name displayed in the navbar.
 * @param {string} [props.className=''] - Optional additional CSS classes.
 */
function Navbar({ brandName = 'SmartTask', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
            <Link to="/login" className="navbar-link" onClick={closeMenu}>
              Login
            </Link>
          </div>

          <div className="navbar-actions">
            <Link
              to="/signup"
              className="btn btn-primary navbar-btn-signup"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
export default Navbar;
