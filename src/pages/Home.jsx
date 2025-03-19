import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhotoDescription from '../components/PhotoDescription';
import PhotoQueries from '../components/PhotoQueries';
import axios from 'axios';

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate('/upload');
//   }, [navigate]);

//   return null; // Avoid rendering anything since it's redirecting
  
// };

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        console.log('Token:', token); // Log the token for debugging

        const response = await axios.get('http://localhost:3000/upload', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setPhotos(response.data.files|| []); // Adjusted to use response.data.files
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);



  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <Link to="/upload" className="text-blue-400 hover:underline">
          Go to Upload Page
        </Link>
      </header>
      <main className="flex flex-1">
        <div className="w-1/2 p-4">
          <PhotoDescription photos={photos} loading={loading} />
        </div>
        <div className="w-1/2 p-4">
          <PhotoQueries />
        </div>
      </main>
    </div>
  );
};

export default Home;