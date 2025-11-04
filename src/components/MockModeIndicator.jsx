import React from 'react';
import { IS_MOCK_MODE } from '../services';

/**
 * Mock Mode Indicator
 * Shows a banner when the app is running in mock mode
 */
const MockModeIndicator = () => {
  if (!IS_MOCK_MODE) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-4 py-2 text-center text-sm font-medium shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg">🎭</span>
        <span>
          MOCK MODE - No Backend Required
        </span>
        <span className="hidden sm:inline">
          • Test Login: <code className="bg-white/20 px-2 py-0.5 rounded">test@example.com</code> / 
          <code className="bg-white/20 px-2 py-0.5 rounded ml-1">password123</code>
        </span>
      </div>
    </div>
  );
};

export default MockModeIndicator;
