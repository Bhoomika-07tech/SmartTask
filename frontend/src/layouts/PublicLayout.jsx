import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './PublicLayout.css';

/**
 * PublicLayout component for wrapping public-facing pages.
 *
 * Structure:
 * - Navbar at the top (branding and navigation).
 * - Semantic <main> element containing page children.
 * - Simple footer with brand info, quick links, and copyright notice.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render within <main>.
 */
function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      {/* Top Navigation */}
      <Navbar />

      {/* Semantic Main Content */}
      <main className="public-main">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="public-footer">
        <div className="public-footer-container">
          <div className="public-footer-brand-section">
            <div className="public-footer-brand">
              <span className="public-footer-brand-icon" aria-hidden="true">
                <svg
                  width="16"
                  height="16"
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
              <span className="public-footer-brand-text">SmartTask</span>
            </div>
            <p className="public-footer-description">
              Get more done, stress less. AI-powered productivity made simple.
            </p>
          </div>

          <div className="public-footer-links-section">
            <h4 className="public-footer-heading">Quick Links</h4>
            <nav className="public-footer-links" aria-label="Footer navigation">
              <Link to="/" className="public-footer-link">Home</Link>
              <Link to="/login" className="public-footer-link">Login</Link>
              <Link to="/signup" className="public-footer-link">Sign Up</Link>
            </nav>
          </div>

          <div className="public-footer-bottom">
            <p className="public-footer-copyright">
              &copy; {new Date().getFullYear()} SmartTask. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { PublicLayout };
export default PublicLayout;
