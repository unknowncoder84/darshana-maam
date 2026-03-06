'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
    
    // In production, you would send this to an error tracking service like Sentry
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#003366] flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-white/80"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Error</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Application Error
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              A critical error occurred. We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="inline-block bg-white text-[#001f3f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Try Again
                </button>
                <a
                  href="/"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#001f3f] transition-colors"
                >
                  Go to Home
                </a>
              </div>

              {/* Contact Information */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-gray-200 mb-4">
                  If you continue to experience issues, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="text-white hover:text-gray-200 underline transition-colors"
                  >
                    Contact Page
                  </a>
                  <span className="text-gray-400 hidden sm:inline">|</span>
                  <a
                    href="mailto:info@lawfirm.com"
                    className="text-white hover:text-gray-200 underline transition-colors"
                  >
                    Email Support
                  </a>
                </div>
              </div>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-white/10 rounded-lg text-left">
                  <p className="text-white font-semibold mb-2">Error Details (Development Only):</p>
                  <pre className="text-gray-200 text-sm overflow-auto">
                    {error.message}
                  </pre>
                  {error.digest && (
                    <p className="text-gray-300 text-sm mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
