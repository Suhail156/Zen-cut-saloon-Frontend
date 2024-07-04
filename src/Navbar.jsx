import React from 'react';
import './Navbar.css';
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
    <div className='nav_container'>
      <div className='nav_section'>
        <h1 onClick={() => navigate('/')}>Zen<span>Cut</span></h1>
      </div>
      <div className='nav_buttons'>
        {!name && !ownername ? (
          <>
            <button onClick={() => navigate('/shoplogin')}>For Business</button>
            <button onClick={() => navigate('/userlogin')}>Login</button>
          </>
        ) : (
          <>
            {ownername ? (
              <button style={{ backgroundColor: 'black', color: 'white' }}>{ownername}</button>
            ) : (
              <button style={{ backgroundColor: 'black', color: 'white' }}>{name}</button>
            )}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
