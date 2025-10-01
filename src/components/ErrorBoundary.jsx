import { Component } from "react";
import ErrorPage from "../pages/ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl min-h-screen mx-auto p-8 dark:bg-gray-800 text-center">
          <ErrorPage
            message="We're sorry for the inconvenience. Please try refreshing the page
        or come back later."
          />

          {/* Show error detail in development mode */}
          {import.meta.env.DEV && (
            <div className="p-4 bg-gray-100 rounded text-left">
              <h3 className="font-semibold">Error Details:</h3>
              <p>
                <strong>{this.state.error?.toString()}</strong>
              </p>
              <pre className="text-sm text-gray-600 mt-2 overflow-auto">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
