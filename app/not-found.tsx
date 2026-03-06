import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#003366] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
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
            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
        </p>

        {/* Navigation Links */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-white text-[#001f3f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Home
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#001f3f] transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-gray-200 mb-4">You might be looking for:</p>
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
              <Link
                href="/articles"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/videos"
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
