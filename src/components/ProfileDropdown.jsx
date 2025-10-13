import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flowerImage from '../images/flower.jpeg'; // Import the flower image

const ProfileDropdown = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
   const wrapperRef = useRef(null);

  const displayName =
    user?.username?.trim() ||
    `${(user?.firstName || '').trim()} ${(user?.lastName || '').trim()}`.trim() ||
    'Profile';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownVisible((v) => !v);


  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <img
        src={user?.profileImage || flowerImage}
        alt="Profile"
        onClick={toggleDropdown}
        style={{ cursor: 'pointer', borderRadius: '50%', width: 40, height: 40, marginRight: 12 }}
      />
      {dropdownVisible && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #ccc',
            padding: 10,
            zIndex: 10000,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <p style={{ margin: 0 }}>{displayName}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: 8,
              fontSize: 12,
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'blue',
            }}
          >
            Logout
          </button>
        </div>
      )}
  </div>

  );
};

export default ProfileDropdown;