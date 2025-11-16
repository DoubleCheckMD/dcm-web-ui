import apiClient from './api';

/**
 * Upload Service
 * Handles file uploads and document management
 */
const uploadService = {
  /**
   * Upload files/photos
   * @param {File[]} files - Array of files to upload
   * @returns {Promise} Response with upload status
   */
  uploadFiles: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('photos', file));

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Upload a single file
   * @param {File} file - File to upload
   * @param {string} fieldName - Field name for the file (default: 'file')
   * @returns {Promise} Response with upload status
   */
  uploadSingleFile: async (file, fieldName = 'file') => {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Get uploaded documents
   * @returns {Promise} Response with list of documents
   */
  getDocuments: async () => {
    const response = await apiClient.get('/documents');
    return response;
  },

  /**
   * Delete a document
   * @param {string} documentId - ID of document to delete
   * @returns {Promise} Response with deletion status
   */
  deleteDocument: async (documentId) => {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response;
  },
};

export default uploadService;
