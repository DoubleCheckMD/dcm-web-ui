import apiClient from './api';

/**
 * Telly Consultant Service
 * Handles tele-consultation case creation and management
 */
const tellyConsultantService = {
  /**
   * Create a new consultation case
   * @param {Object} data - Case data including problemDetails, comorbidities, previousHistory
   * @param {File[]} files - Array of files to upload with the case
   * @returns {Promise} Response with created case
   */
  createCase: async (data, files = []) => {
    const formData = new FormData();
    
    // Append all data fields
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    // Append files
    files.forEach((file) => formData.append('files', file));

    const response = await apiClient.post('/tellyConsultant', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Get all consultation cases
   * @returns {Promise} Response with list of cases
   */
  getAllCases: async () => {
    const response = await apiClient.get('/tellyConsultant');
    return response;
  },

  /**
   * Get a specific consultation case
   * @param {string} caseId - ID of the case
   * @returns {Promise} Response with case details
   */
  getCaseById: async (caseId) => {
    const response = await apiClient.get(`/tellyConsultant/${caseId}`);
    return response;
  },

  /**
   * Update a consultation case
   * @param {string} caseId - ID of the case
   * @param {Object} data - Updated case data
   * @returns {Promise} Response with updated case
   */
  updateCase: async (caseId, data) => {
    const response = await apiClient.put(`/tellyConsultant/${caseId}`, data);
    return response;
  },

  /**
   * Delete a consultation case
   * @param {string} caseId - ID of the case
   * @returns {Promise} Response with deletion status
   */
  deleteCase: async (caseId) => {
    const response = await apiClient.delete(`/tellyConsultant/${caseId}`);
    return response;
  },
};

export default tellyConsultantService;
