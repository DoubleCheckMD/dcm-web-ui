import apiClient from './api';

/**
 * AI Service
 * Handles AI-related API calls for document analysis
 */
const aiService = {
  /**
   * Ask AI a question about uploaded document
   * @param {string} question - Question to ask
   * @param {File} file - Document file (optional if already uploaded)
   * @returns {Promise} Response with AI answer
   */
  askQuestion: async (question, file = null) => {
    const formData = new FormData();
    formData.append('question', question);
    
    if (file) {
      formData.append('file', file);
    }

    const response = await apiClient.post('/ask-ai', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Analyze document with AI
   * @param {File} file - Document to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise} Response with analysis results
   */
  analyzeDocument: async (file, options = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    const response = await apiClient.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Get AI conversation history
   * @param {string} documentId - Document ID (optional)
   * @returns {Promise} Response with conversation history
   */
  getConversationHistory: async (documentId = null) => {
    const url = documentId ? `/conversations/${documentId}` : '/conversations';
    const response = await apiClient.get(url);
    return response;
  },

  /**
   * Clear conversation history
   * @param {string} documentId - Document ID (optional)
   * @returns {Promise} Response with status
   */
  clearConversations: async (documentId = null) => {
    const url = documentId ? `/conversations/${documentId}` : '/conversations';
    const response = await apiClient.delete(url);
    return response;
  },
};

export default aiService;
