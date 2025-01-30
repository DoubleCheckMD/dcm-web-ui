import axios from 'axios';

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:3000/auth/home', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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