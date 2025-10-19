import React from 'react'
import { assets } from '../../assets/assets'
import {Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div  className='w-[250px] min-h-screen border border-gray-400 border-t-0 text-base ' id='sidebar'>
 <div className='pt-12 pl-[20%] flex flex-col gap-5 w-[200px]' id='options'>

  <Link to ='/' className='flex items-center gap-3 border border-gray-400 border-r-sky-100 pt-2 pb-2 pl-2.5 pr-2.5 rounded-custom cursor-pointer ' id='option'>
  <img src={assets.add_icon} alt="" />
  <p>Add Items</p>
  </Link>


 <Link to='/list' className='flex items-center gap-3 border border-gray-400 border-r-0 pt-2 pb-2 pl-2.5 pr-2.5 rounded-custom cursor-pointer' id='option'>
  <img src={assets.order_icon} alt="" />
  <p>List Items</p>
 </Link>

 <Link to= '/order' className='flex items-center gap-3 border border-gray-400 border-r-0 pt-2 pb-2 pl-2.5 pr-2.5 rounded-custom cursor-pointer' id='option'>
  <img src={assets.order_icon} alt="" />
  <p> Orders</p>
 </Link>
 </div>
    </div>
  )
}

export default Sidebar