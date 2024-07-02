// import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='nav_container'>
      <div className='nav_section'>
        <h1 onClick={() => navigate('/')}>Zen<span>Cut</span></h1>
      </div>
      <div className='nav_buttons'>
        <button onClick={()=>navigate('/shophome')}>For bussiness</button>
        <button onClick={()=>navigate('/userlogin')} >Login</button>
      </div>
    </div>
  )
}

export default Navbar
