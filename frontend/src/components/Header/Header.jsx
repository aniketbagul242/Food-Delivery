import React from 'react';

const Header = () => {
  return (
    <>
    <div className='flex justify-center items-center h-[500px] mt-28 sm:mt-1 animate-fadeIn' >

      <div className='pb-8 sm:pb-0' id='container'>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
       <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 -mt-24 '>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-semibold pl-10'> It's not just Food, it's an Experience </h1>
        <p className='text-base font-normal pl-10'>imagine you dont need a diet beacuse we provide healthy and delicious food for you! We are providing the best food delivery services </p>
        <div className='flex items-center pl-10'>
          <button className='bg-red-500 text-white pt-2.5 pb-2.5 pl-6 pr-6 rounded-xl'>View Menu</button>
        </div>
       </div>
  
      <div className='order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative'>
        <div>
           <img className='w-[300px] sm:w-[500px]' src="burger.png" alt="" />
        </div>
      </div>

          </div>
      </div>
   
    </div>
    </>
  )
}

export default Header;