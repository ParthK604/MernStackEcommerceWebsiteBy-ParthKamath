import { useState } from 'react'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/products';
import Success from './pages/Success';
import Items from './pages/Items';
import { Routes,Route } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import AppLayout from './components/AppLayout';
import Cart from './pages/Cart';
import FinalPage from './pages/FinalPage';
import "./App.css";

function App() {
  

  return (
    <>
      <Routes>

      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/items' element={<Items/>}/>
        <Route path='/finalsuccess' element={<FinalPage/>}/>
      </Route>

      
      <Route element={<AppLayout />}>
        <Route path="/" element={<Products />} />
        <Route path="/success" element={<Success />} />
        <Route path='/cart' element={<Cart/>}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
