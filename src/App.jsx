// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Home from './Home'
import Login from './User/Login'
import Signup from './User/Signup'
import ShopHome from '../../Shop/ShopHome'
import AddShop from '../../Shop/AddShop'
import ShopSignup from '../../Shop/ShopSignup'
import ShopLogin from '../../Shop/ShopLogin'
import SinglePage from './User/SinglePage'
import UserProfile from './User/UserProfile'
import ProtectedRoute from '../../Shop/ProtectedRoute';
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import User from './Admin/User';
import Owner from './Admin/Owner';
import BookingPage from './User/BookingPage';
import AdminEditOwners from './Admin/AdminEditOwners';
import BookingDeatiles from '../../Shop/BookingDeatiles';
import ShopDetailes from '../../Shop/ShopDetailes';
import ShopEdit from '../../Shop/ShopEdit';

const App = () => {
  const adminToken = localStorage.getItem('token');
  console.log(adminToken);
  return (
    <div>
      <Toaster/>  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userlogin' element={<Login/>}/>
        <Route path='/usersignup'element={<Signup/>}/>
        <Route path='/singlepage/:id' element={<SinglePage/>}/>
        <Route path='/profile/:id' element={<UserProfile/>}/>
        <Route path='/bookingpage' element={<BookingPage/>}/>
        
        <Route path='/shophome' element={<ProtectedRoute><ShopHome/></ProtectedRoute>}/>
        <Route path='/addshop' element={<ProtectedRoute> <AddShop/></ProtectedRoute>}/>
        <Route path='/shopsignup' element={<ShopSignup/>}/>
        <Route path='/shoplogin' element={<ShopLogin/>}/>
        <Route path='/bookingdeatiles' element={<BookingDeatiles/>}/>
        <Route path='/viewshops' element={<ShopDetailes/>}/>
        <Route path='/editshop'   element={<ShopEdit/>}/>

        
        <Route path='/adminlogin' element={<AdminLogin/>} />
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path="/users" element={<User />} />
        <Route path='/owners' element={<Owner/>}/>
        <Route path='/admineditowners/:id' element={<AdminEditOwners/>}/>
      </Routes>
    
    </div>
  )
}

export default App

