import React, { useState } from 'react';
import { GoBell } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='flex justify-between items-center p-4 bg-green-800 shadow-md'>
      <div>
        {/* <h1 className='text-xs text-gray-500'>Welcome Back!</h1> */}
      </div>
      <div className='flex items-center space-x-5'>
        {/* <div className='hidden md:flex'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
          />
        </div> */}
        <div className='relative'>
          <button className='relative text-white'>
            <GoBell size={28} />
            <span className='absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white'>
              9
            </span>
          </button>
        </div>
        <div className='relative'>
          <img
            className='w-8 h-8 rounded-full border-4 border-indigo-400 cursor-pointer'
            src='https://randomuser.me/api/portraits/women/50.jpg'
            alt='User'
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20'>
              <Link to="/user/profile" className='block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white'>Profile</Link>
              <Link to="/" className='block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white'>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
