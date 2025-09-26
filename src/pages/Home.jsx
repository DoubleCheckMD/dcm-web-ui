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

  const handleCreateCase = () => {
    // Logic to handle creating a new case
    console.log("Create Case button clicked");
    // You can add navigation or other actions here
     // Navigate to the create case page
     navigate('/create-case');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <Link to="/upload" className="text-blue-400 hover:underline">
          Go to Upload Page
        </Link>
      </header>
      <main className="flex flex-col flex-1 p-4 items-center justify-center"
        style={{
          backgroundColor: "#f9f9f9",
          border: "1px solid #e0e0e0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "24px",
          margin: "16px",
        }}
      >
      
         {/* Create Case Button */}
         <div className="mb-4">
          <button
            onClick={handleCreateCase}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Telly Consultant
          </button>
        </div>

        {/* Photo Description and Photo Queries */}
        <div className="flex flex-1 w-full">
        <div className="w-1/2 p-4">
          <PhotoDescription photos={photos} loading={loading} />
        </div>
        <div className="w-1/2 p-4">
          <PhotoQueries />
        </div>
        </div>
      </main>
    </div>
  );
};

export default Home;