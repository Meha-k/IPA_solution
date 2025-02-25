import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              IPA Solution
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Data Entry
            </Link>
            <Link
              href="/documents"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Document Processing
            </Link>
            <Link
              href="/chat"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Chatbot
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Conditionally Rendered) */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/data-entry"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Data Entry
            </Link>
            <Link
              href="/document-processing"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Document Processing
            </Link>
            <Link
              href="/chat"
              className="text-white block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Chatbot
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}