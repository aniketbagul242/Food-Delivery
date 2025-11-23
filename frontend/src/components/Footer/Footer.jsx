//import React from 'react'
import { assets } from '../../assets/assets'
import React, { forwardRef } from 'react';

const Footer = forwardRef((props, ref) => {

  return (
    <div ref={ref} className='text-[#d9d9d9] bg-[#323232] flex items-center gap-5 pt-24 pb-5 pr-[8vw] pl-[8vw] flex-col mt-32   ' id='footer'>

      <div className='w-full grid sm:grid-cols-custom grid-cols-1 gap-20  ' id='footer-content'>
        <div className='flex flex-col items-start gap-5' id='left'><img className='w-44' src="logo2.png" alt="" />
          <p> Welcome to [Food Delivery], your go-to destination for delicious recipes, cooking tips, and food inspiration. Whether you're a seasoned chef or a kitchen newbie, we’re here to help you create mouthwatering meals that bring joy to your table.

          </p>
          <div className='w-10 mr-3 flex gap-5 ' id='footer-icon'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className='flex flex-col items-start gap-5' id='center'>
          <h2 className='text-white text-2xl font-semibold'>COMPANY</h2>
          <ul >
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className='flex flex-col items-start gap-5' id='right' >
          <h2 className='text-white text-2xl font-semibold'>GET IN TOUCH</h2>
          <ul>
            <li>+1-234-567-89</li>
            <li>contact@FoodDelivery.com</li>
          </ul>
        </div>
      </div>
      <hr className='w-full h-0.5 mt-5 mb-5' />
      <p>Copyright 2025 FoodDelivery.com - All Right Reserved.</p>
    </div>
  )
})

export default Footer