import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/upload');
  }, [navigate]);

  return null; // Avoid rendering anything since it's redirecting
  
};

export default Home;