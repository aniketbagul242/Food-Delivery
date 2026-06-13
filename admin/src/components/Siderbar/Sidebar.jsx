import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

  const location = useLocation();

  return (
    <div className='w-[240px] min-h-screen bg-white border-r border-gray-200 shadow-sm'>

      <div className='flex flex-col gap-3 p-5'>

        <Link
          to='/'
          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200
          ${location.pathname === "/"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <img className='w-5' src={assets.add_icon} alt="" />
          <p className='font-medium'>Add Items</p>
        </Link>

        <Link
          to='/list'
          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200
          ${location.pathname === "/list"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <img className='w-5' src={assets.order_icon} alt="" />
          <p className='font-medium'>List Items</p>
        </Link>

        <Link
          to='/order'
          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200
          ${location.pathname === "/order"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          <img className='w-5' src={assets.order_icon} alt="" />
          <p className='font-medium'>Orders</p>
        </Link>

      </div>
    </div>
  )
}

export default Sidebar