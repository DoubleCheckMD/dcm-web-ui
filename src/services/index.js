// Central export file for all services
// Automatically switches between real and mock services based on VITE_USE_MOCK env variable

import realAuthService from './authService';
import realUploadService from './uploadService';
import realAIService from './aiService';
import realSecondOpinionService from './secondOpinionService';

import { mockAuthService, mockUploadService, mockAIService, mockSecondOpinionService } from './mock';

// Check if we should use mock services
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Log the mode on startup
if (USE_MOCK) {
  console.log('🎭 MOCK MODE ENABLED - Using mock services');
  console.log('📝 Test credentials: test@example.com / password123');
} else {
  console.log('🌐 LIVE MODE - Using real API services');
  console.log('🔗 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000');
}

// Export services based on mode
export const authService = USE_MOCK ? mockAuthService : realAuthService;
export const uploadService = USE_MOCK ? mockUploadService : realUploadService;
export const aiService = USE_MOCK ? mockAIService : realAIService;
export const secondOpinionService = USE_MOCK ? mockSecondOpinionService : realSecondOpinionService;

// Maintain backward compatibility
export const tellyConsultantService = secondOpinionService;

// Always export apiClient and API_BASE_URL for direct use if needed
export { default as apiClient, API_BASE_URL } from './api';

// Export mode flag
export const IS_MOCK_MODE = USE_MOCK;
