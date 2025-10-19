import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Siderbar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import Add from './pages/Add/Add'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
       <div>
        <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='flex'>
      <Sidebar/>
      
 <Routes>
  <Route path='/' element={<Add/>} />
  <Route path="/list" element={<List/>} />
  <Route path="/order" element={<Order/>} />
 </Routes>
  </div>
   </ div>
  )
}

export default App