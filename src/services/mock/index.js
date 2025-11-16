/**
 * Mock Services Index
 * Exports all mock services for testing without backend
 */

export { default as mockAuthService } from './mockAuthService';
export { default as mockUploadService } from './mockUploadService';
export { default as mockAIService } from './mockAIService';
export { default as mockSecondOpinionService } from './mockSecondOpinionService';

// Maintain backward compatibility
export { default as mockTellyConsultantService } from './mockSecondOpinionService';
