// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Home from './Home'
import Navbar from './Navbar'
import Login from './User/Login'
import Signup from './User/Signup'
import ShopHome from '../../Shop/ShopHome'
import AddShop from '../../Shop/AddShop'
import ShopSignup from '../../Shop/ShopSignup'
import ShopLogin from '../../Shop/ShopLogin'
import SinglePage from './User/SinglePage'
import UserProfile from './User/UserProfile'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userlogin' element={<Login/>}/>
        <Route path='/usersignup'element={<Signup/>}/>
        <Route path='/profile/:id' element={<UserProfile/>}/>
        <Route path='/shophome' element={<ShopHome/>}/>
        <Route path='/addshop' element={<AddShop/>}/>
        <Route path='/shopsignup' element={<ShopSignup/>}/>
        <Route path='/shoplogin' element={<ShopLogin/>}/>
        <Route path='/singlepage/:id' element={<SinglePage/>}/>
      </Routes>
    
    </div>
  )
}

export default App

