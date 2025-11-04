import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flowerImage from '../images/flower.jpeg';
import ThemeToggle from './ThemeToggle';
import SecondOpinionLogo from './SecondOpinionLogo';

const UserProfileHeader = ({ user, onEditProfile }) => {
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
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEditProfile = () => {
    setDropdownVisible(false);
    if (onEditProfile) {
      onEditProfile();
    }
  };

  return (
    <header className="transition-colors duration-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left spacer for balance */}
          <div className="flex items-center gap-4 w-[200px]">
            {/* Empty space for symmetry */}
          </div>

          {/* Center: Logo and Brand Name */}
          <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            <SecondOpinionLogo width={200} showText={true} />
          </div>

        {/* Right side - Theme Toggle and Profile */}
        {user && (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative flex items-center">
              <img
                src={user.profileImage || flowerImage}
                alt="Profile"
                onClick={toggleDropdown}
                className="cursor-pointer rounded-full w-11 h-11 border-2 border-gray-200 dark:border-gray-600 shadow-md hover:scale-110 hover:border-accent dark:hover:border-accent transition-all"
              />
              {dropdownVisible && (
                <div ref={dropdownRef} className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 z-10 min-w-[180px]">
                  <p className="m-0 text-gray-800 dark:text-gray-200 font-medium mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">{user.username || 'User'}</p>
                  <button 
                    onClick={handleEditProfile}
                    className="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent-light transition-colors font-medium mb-2 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default UserProfileHeader;