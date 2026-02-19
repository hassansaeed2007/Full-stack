import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import ProductsDetail from './pages/ProductsDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
 import { ToastContainer } from 'react-toastify';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/product-detail/:id" element = {<ProductsDetail/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route path = "/profile" element = {<Profile/>}/>
      <Route path = "/forgot-password" element = {<ForgotPassword/>}/>
      <Route path = "/reset-password/:token" element = {<ResetPassword/>}/>
    </Routes>
    </>
  )
}

export default App
