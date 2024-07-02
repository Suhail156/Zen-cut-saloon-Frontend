// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import './App.css'
import Login from './User/Login'
import Signup from './User/Signup'
import ShopHome from '../../Shop/ShopHome'
import AddShop from '../../Shop/AddShop'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userlogin' element={<Login/>}/>
        <Route path='/usersignup'element={<Signup/>}/>
        <Route path='/shophome' element={<ShopHome/>}/>
        <Route path='/addshop' element={<AddShop/>}/>
      </Routes>
      
    </div>
  )
}

export default App

