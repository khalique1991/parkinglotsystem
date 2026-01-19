import React from 'react'
import { AlertCircle } from 'lucide-react'

/**
 * Error Boundary component to catch and handle React component errors
 * Prevents entire app from crashing when a component fails
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }))

    // Log to external error tracking service (e.g., Sentry)
    if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
      this.logErrorToService(error, errorInfo)
    }
  }

  logErrorToService = (error, errorInfo) => {
    // TODO: Integrate with Sentry or similar service
    console.warn('Error tracking would be sent here:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.MODE === 'development'

      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 text-center mb-4">
              We encountered an unexpected error. Our team has been notified.
            </p>

            {/* Error Details (Development Only) */}
            {isDevelopment && this.state.error && (
              <div className="bg-gray-100 rounded p-4 mb-4 text-sm overflow-auto max-h-40">
                <p className="font-mono text-red-600 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <p className="font-mono text-gray-700 mt-2 whitespace-pre-wrap break-words">
                    {this.state.errorInfo.componentStack}
                  </p>
                )}
              </div>
            )}

            {/* Error Count Warning */}
            {this.state.errorCount > 3 && (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
                <p className="text-sm">
                  Multiple errors detected. Please clear your browser cache or contact support.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 flex-col">
              <button
                onClick={this.handleReset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Go Home
              </button>
            </div>

            {/* Support Link */}
            <p className="text-xs text-gray-500 text-center mt-4">
              If the problem persists, please{' '}
              <a href="/support" className="text-blue-600 hover:underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
