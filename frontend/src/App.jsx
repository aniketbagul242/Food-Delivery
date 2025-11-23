import React, { useState, useRef } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Myorder from './pages/Myorder/Myorder'
import Verify from './pages/Verify/Verify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './components/SearchResults/SearchResults'


const App = () => {

  const contactRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <ToastContainer />
      <div className='custom-s:w-3/4 w-[90%] m-auto'>
        <Navbar setShowLogin={setShowLogin} contactRef={contactRef} />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/myorders' element={<Myorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/search' element={<SearchResults />} />

        </Routes>

      </div>
      <Footer ref={contactRef} />
    </>
  )
}

export default App
