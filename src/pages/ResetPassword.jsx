import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });
      
      if (response.status === 200) {
        navigate('/login');
      }
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setMessage('Passwords do not match');
    }else {
        setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 border"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2">Reset Password</button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;