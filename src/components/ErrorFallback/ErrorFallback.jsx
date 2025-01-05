import PropTypes from "prop-types";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again Later</button>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
