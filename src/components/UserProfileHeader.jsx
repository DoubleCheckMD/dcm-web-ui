import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flowerImage from '../images/flower.jpeg'; // Import the flower image

const UserProfileHeader = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#f8f8f8' }}>
      <div></div> {/* Empty div to push the profile to the right */}
      {user && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <img
            src={user.profileImage || flowerImage}
            alt="Profile"
            onClick={toggleDropdown}
            style={{ cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', marginRight: '20px' }}
          />
          {dropdownVisible && (
            <div ref={dropdownRef} style={{ position: 'absolute', right: 0, top: '100%', backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', zIndex: 1, whiteSpace: 'nowrap' }}>
              <p style={{ margin: 0 }}>{user.username}</p>
              <button onClick={handleLogout} style={{ fontSize: '12px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'blue' }}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default UserProfileHeader;