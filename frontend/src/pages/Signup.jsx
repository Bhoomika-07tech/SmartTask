import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { supabase } from '../lib/supabase';
import './Signup.css';

/**
 * Signup page component for SmartTask.
 * Allows new users to create an account using their name, email, and password
 * via Supabase Auth.
 */
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Handles user submission of the signup form.
   * Validates inputs, handles loading state, and calls supabase.auth.signUp.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validations to prevent empty or invalid submissions
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Call Supabase Auth to register user with email and password
      // The user's name is saved in user metadata using options.data
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Display a meaningful success message
      if (data?.session) {
        setSuccess('Account created successfully! You can now log in.');
      } else {
        setSuccess(
          'Account created successfully! Please check your email to confirm your account.'
        );
      }

      // Reset the form fields on successful registration
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Brand Header */}
        <div className="signup-header">
          <Link to="/" className="signup-logo" aria-label="SmartTask Home">
            <span className="signup-logo-icon" aria-hidden="true">
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
            <span className="signup-logo-text">SmartTask</span>
          </Link>
        </div>

        {/* Signup Form Card */}
        <Card className="signup-card">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">
            Sign up to start organizing and managing your tasks.
          </p>

          {/* Error Message Alert */}
          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}

          {/* Success Message Alert */}
          {success && (
            <div className="alert alert-success" role="status">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="signup-form">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={loading}
                required
              />
            </div>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min. 6 characters)"
                disabled={loading}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="signup-submit-btn"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="signup-footer">
            <p className="signup-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="signup-link">
                Log in
              </Link>
            </p>
            <Link to="/" className="signup-back-link">
              &larr; Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
