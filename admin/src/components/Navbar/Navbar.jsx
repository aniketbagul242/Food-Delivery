import React from 'react'
import { assets } from '../../assets/assets'


const Navbar = () => {
  return (
    <div className='w-full flex justify-center '>
      <div className='w-[90%] flex justify-between items-center'>
    
  <img className='w-44 ' src="logo2.png" alt="" />
  <img className='w-10' src={assets.profile_image} alt="" />
    </div>
    </div>
  )
}

export default Navbar