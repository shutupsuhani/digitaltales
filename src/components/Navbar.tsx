"use client"

import React from 'react';
import Link from 'next/link';
import { FaMedium,FaPen, FaSearch,FaUser, FaBell } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <div className='flex justify-start'>
          <img src='/logo.jpg' width={50} height={50} className='rounded-full shadow-lg'/>
          <h3 className='mt-2 font-serif ml-1'>DigiTales</h3>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-full max-w-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-gray-700 w-full"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/writeblog" className="flex items-center space-x-1 text-gray-600 hover:text-black">
            <FaPen />
            <span className="hidden sm:inline">Write</span>
          </Link>
          <FaBell className="text-gray-600 hover:text-black cursor-pointer" />
          <Link href="/user/profile"><FaUser/></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
