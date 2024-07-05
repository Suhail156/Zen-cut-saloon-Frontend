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
    <div className='nav_container' style={{}}>
      <div className='nav_section'>
        <h1  onClick={() => navigate('/')}>Zen<span>Cut</span></h1>
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
              <div style={{width:'1356px',height:'70px', backgroundColor:'black',zIndex:'-1',position:'absolute',marginLeft:'-1155px',marginTop:'-20px'}}>
                  <div style={{float:'left',width:'150px',height:'50px',backgroundColor:'black',marginLeft:'105px'}}><h1 style={{float:'left',color:'white',marginTop:'20px'}} onClick={() => navigate('/')}>Zen<span>Cut</span></h1></div>
              <button style={{ backgroundColor: 'black', color: 'white', marginLeft:'790px',marginTop:'20px'}}>{name}</button></div>
            )}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
