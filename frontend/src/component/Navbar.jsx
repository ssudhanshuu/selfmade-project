import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
       <div className='flex space-x-4 text-white font-bold '>
         <Link to="/product"  className="px-3 py-2 rounded-md transition transform hover:-translate-y-0.5 hover:shadow-lg">Product</Link>
         <Link to="/login" className="px-3 py-2 rounded-md transition transform hover:-translate-y-0.5 hover:shadow-lg">Login</Link>
         <Link to="/signup" className="px-3 py-2 rounded-md transition transform hover:-translate-y-0.5 hover:shadow-lg">Signup</Link>
      </div>
    </>
  );
}

export default Navbar;