import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css'; // Import the CSS file
import UserProfileHeader from '../components/UserProfileHeader'; // Import the UserProfileHeader component
import useFetchUser from '../utils/useFetchUser'; // Import the custom hook

const Upload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');
  const user = useFetchUser(); // Use the custom hook to fetch user data

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('No files selected');
      return;
    }

    const formData = new FormData();
   files.forEach(file => formData.append('photos', file));

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          "Authorization" : `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response); // Log the response
      if (response.status === 200) {
        console.log('File uploaded successfully');
        setFiles([]);
        setPreviews([]);
        setError('');
        navigate('/success'); // Navigate to success page
      } else {
        console.error('Upload failed with status:', response.status);
      }
    } catch (err) {
      console.log(err.message);
      setError('Error uploading files');
      setUploadStatus('');
    }
  };

  return (
    <div>
    <UserProfileHeader user={user} /> {/* Use the UserProfileHeader component */}
    <div className='upload-container'>
     {previews.length > 0 && (
          <div className='photo-preview'>
            <h2>Selected Photos:</h2>
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt="Selected" className='uploaded-photo' />
            ))}
          </div>
        )}
    <form onSubmit={handleSubmit} className='upload-form'>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" className="upload-button">
        LOAD FILE
      </button>
    </form>
    {uploadStatus && <p>{uploadStatus}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default Upload;