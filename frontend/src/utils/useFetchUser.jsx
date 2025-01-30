import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from './fetchUser';

const useFetchUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        navigate('/login');
      }
    };

    getUser();
  }, [navigate]);

  return user;
};

export default useFetchUser;