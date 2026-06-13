import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully")

    setTimeout(() => {
      navigate("/login")
    }, 800)
  }

  return (
    <div className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
      <div className='w-[92%] mx-auto h-20 flex items-center justify-between'>

        {/* Logo */}
        <div className='flex items-center'>
          <img
            className='w-40 cursor-pointer transition-transform duration-300 hover:scale-105'
            src="/logo2.png"
            alt="logo"
          />
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>

          <div className='hidden sm:block text-right'>
            <p className='text-sm font-semibold text-gray-800'>
              Welcome Back
            </p>
            <p className='text-xs text-gray-500'>
              Manage your food store
            </p>
          </div>

          <div className='w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm'>
            <img
              className='w-full h-full object-cover'
              src={assets.profile_image}
              alt="profile"
            />
          </div>

          <button
            onClick={logoutHandler}
            className='px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 shadow-sm'
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}

export default Navbar