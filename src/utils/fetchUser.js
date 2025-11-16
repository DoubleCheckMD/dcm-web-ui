import { authService } from '../services';

export const fetchUser = async () => {
  try {
    if (!authService.isAuthenticated()) {
      throw new Error('No token found');
    }

    const response = await authService.getCurrentUser();

    if (response.status === 201) {
      return response.data.user;
    } else {
      throw new Error('Failed to fetch user');
    }
  } catch (err) {
    console.error('Error fetching user:', err.message);
    throw err;
  }
};