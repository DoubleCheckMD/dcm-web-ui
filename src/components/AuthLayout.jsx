import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SecondOpinionLogo from './SecondOpinionLogo';

const AuthLayout = ({ children, leftPaneContent, showMobileLogo = true, leftPaneTitle, leftPaneSubtitle }) => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Theme Toggle - Fixed Position at Top Right */}
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      {/* Left Pane - Company Info / Custom Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent via-blue-600 to-accent-dark relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-12 text-white">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <div className="mb-6">
                <SecondOpinionLogo showText={true} variant="white" />
              </div>
              {leftPaneTitle && <p className="text-xl text-white/90 mb-2">{leftPaneTitle}</p>}
              {leftPaneSubtitle && <p className="text-sm text-white/80 mb-2">{leftPaneSubtitle}</p>}
              {(leftPaneTitle || leftPaneSubtitle) && <div className="w-20 h-1 bg-white/40 rounded-full mb-6"></div>}
            </div>

            {/* Custom Left Pane Content */}
            {leftPaneContent}
          </div>
        </div>
      </div>

      {/* Right Pane - Form Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-800 transition-colors duration-200 relative">
        {/* Back to Home - Top Left of Right Pane */}
        <Link
          to="/"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-all duration-200 hover:gap-3 group z-10"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Home</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          {showMobileLogo && (
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <SecondOpinionLogo showText={false} width={64} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Second Opinion</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Medical Consultation Platform</p>
            </div>
          )}

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
