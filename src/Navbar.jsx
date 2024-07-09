import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const name = localStorage.getItem('name');
  const ownername = localStorage.getItem('ownername');
  
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className={`nav_container ${ownername ? 'owner_logged_in' : ''} `}>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        <h1 
          className="text-3xl font-bold cursor-pointer text-black hover:text-black transition duration-300 mb-4 md:mb-0"
          onClick={() => navigate('/')}
        >
          Zen<span className="text-gray-800">Cut</span>
        </h1>
        <div className="flex gap-4">
          {!name && !ownername ? (
            <>
              <button
                className="px-4 py-2 text-gray-700 border border-gray-700 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
                onClick={() => navigate('/shoplogin')}
              >
                For Business
              </button>
              <button
                className="px-4 py-2 text-gray-700 border border-gray-700 rounded-full hover:bg-gray-200 hover:text-gray-900 transition duration-300"
                onClick={() => navigate('/userlogin')}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-solid-black rounded-full"
              >
                {ownername ? ownername : name}
              </button>
              <button 
                className="btn btn-outline-red hover:text-black rounded-full"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
