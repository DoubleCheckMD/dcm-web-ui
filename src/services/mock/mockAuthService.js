/**
 * Mock Auth Service
 * Returns fake data for testing without a backend
 */

// Simulated delay to mimic network requests
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@doublecheckmd.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    createdAt: new Date().toISOString(),
  },
];

// Mock token
const MOCK_TOKEN = 'mock-jwt-token-12345';

const mockAuthService = {
  /**
   * Mock login - accepts any email/password
   * Use test@example.com / password123 for success
   */
  login: async (credentials) => {
    await delay();
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user || user.password !== credentials.password) {
      throw {
        response: {
          status: 401,
          data: { message: 'Invalid email or password' }
        }
      };
    }

    localStorage.setItem('token', MOCK_TOKEN);
    localStorage.setItem('mockUser', JSON.stringify(user));
    
    return {
      status: 201,
      data: {
        token: MOCK_TOKEN,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      }
    };
  },

  /**
   * Mock register - always succeeds
   */
  register: async (userData) => {
    await delay();
    
    // Check if email already exists
    if (mockUsers.find(u => u.email === userData.email)) {
      throw {
        response: {
          status: 400,
          data: { message: 'Email already registered' }
        }
      };
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    return {
      status: 201,
      data: {
        message: 'Registration successful',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        }
      }
    };
  },

  /**
   * Mock logout
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mockUser');
    window.location.href = '/login';
  },

  /**
   * Mock get current user
   */
  getCurrentUser: async () => {
    await delay(300);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };
    }

    const userStr = localStorage.getItem('mockUser');
    const user = userStr ? JSON.parse(userStr) : mockUsers[0];
    
    return {
      status: 201,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      }
    };
  },

  /**
   * Mock forgot password
   */
  forgotPassword: async (email) => {
    await delay();
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw {
        response: {
          status: 404,
          data: { message: 'Email not found' }
        }
      };
    }
    
    return {
      status: 200,
      data: {
        message: 'Password reset link sent to your email (Mock Mode - Check console)',
        resetToken: 'mock-reset-token-123'
      }
    };
  },

  /**
   * Mock reset password
   */
  resetPassword: async (token, passwords) => {
    await delay();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      throw {
        response: {
          status: 400,
          data: { message: 'Passwords do not match' }
        }
      };
    }

    if (passwords.newPassword.length < 6) {
      throw {
        response: {
          status: 400,
          data: { message: 'Password must be at least 6 characters' }
        }
      };
    }
    
    return {
      status: 200,
      data: {
        message: 'Password reset successful'
      }
    };
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get auth token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default mockAuthService;
