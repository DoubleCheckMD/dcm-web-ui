import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetchUser from '../utils/useFetchUser'; // Import the custom hook
import UserProfileHeader from '../components/UserProfileHeader'; // Import the UserProfileHeader component

const Home = () => {
  const navigate = useNavigate();
  const user = useFetchUser(); // Use the custom hook to fetch user data

  return (
    <div>
      <UserProfileHeader user={user} /> {/* Use the UserProfileHeader component */}
      <div style={{ padding: '10px' }}>
        <Link to="/upload" className="text-blue-500">Upload Photo</Link>
      </div>
    </div>
  );
};

export default Home;