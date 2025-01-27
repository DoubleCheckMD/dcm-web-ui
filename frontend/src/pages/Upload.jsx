import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css'; // Import the CSS file


const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response); // Log the response
      if (response.status === 200) {
        console.log('File uploaded successfully');
        navigate('/success'); // Navigate to success page
      } else {
        console.error('Upload failed with status:', response.status);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
     
    <div className='upload-container'>
       {preview && (
      <div className='photo-preview'>
        <h2>Selected Photo:</h2>
        <img src={preview} alt="Selected" className='uploaded-photo' />
      </div>
    )}
    <form onSubmit={handleSubmit} className='upload-form'>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" className="upload-button">
        Upload
      </button>
    </form>
   
    </div>
    </div>
  );
};

export default Upload;