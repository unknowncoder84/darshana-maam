'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
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
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">500</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Something Went Wrong
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
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
            <Link
              href="/"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#001f3f] transition-colors"
            >
              Go to Home
            </Link>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-gray-200 mb-4">
              If the problem persists, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                Contact Page
              </Link>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a
                href="mailto:info@lawfirm.com"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <p className="text-gray-200 mb-4">Or visit:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/practice-areas"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                Practice Areas
              </Link>
              <Link
                href="/news"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
