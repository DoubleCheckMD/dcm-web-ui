import apiClient from './api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  /**
   * Register new user
   * @param {Object} userData - { firstName, lastName, email, password }
   * @returns {Promise} Response with user data
   */
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response;
  },

  /**
   * Logout user
   * Clears local storage and redirects to login
   */
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  /**
   * Get current user profile
   * @returns {Promise} Response with user data
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/home');
    return response;
  },

  /**
   * Request password reset
   * @param {string} email - User's email address
   * @returns {Promise} Response with message
   */
  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response;
  },

  /**
   * Reset password with token
   * @param {string} token - Reset token from email
   * @param {Object} passwords - { newPassword, confirmPassword }
   * @returns {Promise} Response with message
   */
  resetPassword: async (token, passwords) => {
    const response = await apiClient.post(`/auth/reset-password/${token}`, passwords);
    return response;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get auth token
   * @returns {string|null} Auth token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
