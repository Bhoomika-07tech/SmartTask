import './LoadingSpinner.css';

/**
 * Accessible loading spinner component for displaying intermediate loading states,
 * such as initial authentication verification.
 *
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - User-facing loading message.
 */
function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

export { LoadingSpinner };
export default LoadingSpinner;
