// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import './App.css'
import Login from './User/Login'
import Signup from './User/Signup'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userlogin' element={<Login/>}/>
        <Route path='/usersignup'element={<Signup/>}/>
      </Routes>
      
    </div>
  )
}

export default App

