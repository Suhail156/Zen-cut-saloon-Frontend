import { Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Home from './Home'
import Login from './User/Login'
import Signup from './User/Signup'
import ShopHome from '../src/Shop/ShopHome'
import AddShop from '../src/Shop/AddShop'
import ShopSignup from '../src/Shop/ShopSignup'
import ShopLogin from '../src/Shop/ShopLogin'
import SinglePage from './User/SinglePage'
import UserProfile from './User/UserProfile'
import ProtectedRoute from './ProtectedRoute';
import BookingDetailses from '../src/Shop/BookingDeatiles';
import AdminLogin from './Admin/AdminLogin';
import AdminHome from './Admin/AdminHome';
import User from './Admin/User';
import Owner from './Admin/Owner';
import BookingPage from './User/BookingPage';
import AdminEditOwners from './Admin/AdminEditOwners';
import ShopDetailes from '../src/Shop/ShopDetailes';
import ShopEdit from '../src/Shop/ShopEdit';
import ShopOwnerProfile from '../src/Shop/ShopOwnerProfile';
import BookingDetailes from './Admin/BookingDetailes';
import Shop from './Admin/Shop';
import EditOwners from './Shop/EditOwners';
import EditProfile from './User/EditProfile';
import BookingPending from './Shop/BookingPending';

const App = () => {
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
        <Route path='editprofile/:id' element={<EditProfile/>}/>
        
        <Route path='/shophome' element={<ProtectedRoute><ShopHome/></ProtectedRoute>}/>
        <Route path='/addshop' element={<ProtectedRoute> <AddShop/></ProtectedRoute>}/>
        <Route path='/shopsignup' element={<ShopSignup/>}/>
        <Route path='/shoplogin' element={<ShopLogin/>}/>
        <Route path='/bookingdetails' element={<BookingDetailses/>}/>
        <Route path='/viewshops' element={<ShopDetailes/>}/>
        <Route path='/editshop/:id'   element={<ShopEdit/>}/>
        <Route path='/ownerprofile/:id' element={<ShopOwnerProfile/>}/>
        <Route path='/editowner/:id' element={<EditOwners/>}/>
        <Route path='/ownerviewpending/:id' element={<BookingPending/>}/>

        
        <Route path='/adminlogin' element={<AdminLogin/>} />
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path="/users" element={<User />} />
        <Route path='/owners' element={<Owner/>}/>
        <Route path='/admineditowners/:id' element={<AdminEditOwners/>}/>
        <Route path='/bookingdetailes/:id' element={<BookingDetailes/>}/>
        <Route path='/shopdetails/:id' element={<Shop/>}/>
      </Routes>
    
    </div>
  )
}

export default App

