"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPen, FaSearch, FaBell } from 'react-icons/fa';
import { UserButton } from '@clerk/nextjs';


const Navbar: React.FC = () => {
  
   const [isScroll,setIsScroll]=useState(false);
   
   useEffect(()=>{
        const handleScroll=()=>{
          setIsScroll(window.scrollY > 10);
        }  
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
   },[])


  return (
    <nav className={`fixed top-0 p-2 border-b border-gray-300 left-0 w-full z-50 transition-shadow ${isScroll? "bg-white shadow-lg" :"bg-white"}`}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <div className='flex justify-start'>
          <img src='/thunder.png' width={40} height={40} className='rounded-full '/>
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
          
          <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: 'h-8 w-8', // Set avatar size
            },
          }}
        />
       
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
