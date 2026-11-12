import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { supabase } from '../lib/supabase';
import './Login.css';

/**
 * Login page component for SmartTask.
 * Allows existing users to authenticate with their email and password
 * via Supabase Auth, navigating to /dashboard on success.
 */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles user submission of the login form.
   * Validates inputs, handles loading state to prevent duplicate submissions,
   * authenticates via Supabase, and navigates to the dashboard on success.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while a request is pending
    if (loading) return;

    setError('');

    // Validate that both fields are filled
    if (!email.trim() || !password) {
      if (!email.trim() && !password) {
        setError('Please enter both your email address and password.');
      } else if (!email.trim()) {
        setError('Please enter your email address.');
      } else {
        setError('Please enter your password.');
      }
      return;
    }

    setLoading(true);

    try {
      // Authenticate with Supabase using email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      // On successful authentication, navigate to requested route or dashboard
      if (data?.user || data?.session) {
        const targetPath = location.state?.from?.pathname || '/dashboard';
        navigate(targetPath, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Brand Header */}
        <div className="login-header">
          <Link to="/" className="login-logo" aria-label="SmartTask Home">
            <span className="login-logo-icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
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
            <span className="login-logo-text">SmartTask</span>
          </Link>
        </div>

        {/* Login Form Card */}
        <Card className="login-card">
          <h1 className="login-title">Log In</h1>
          <p className="login-subtitle">
            Log in to your SmartTask account to access your tasks.
          </p>

          {/* Error Message Alert */}
          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="login-submit-btn"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="login-footer">
            <p className="login-footer-text">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="login-link">
                Sign up
              </Link>
            </p>
            <Link to="/" className="login-back-link">
              &larr; Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
