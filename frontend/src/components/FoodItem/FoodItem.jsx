import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);


  return (
    <div className='w-full m-auto rounded-2xl shadow-custom-shadow transition duration-300 animate-fadeIn'>

      <div className='relative'>
        <img className='w-full rounded-bl-none rounded-br-none rounded-tl-2xl rounded-tr-2xl' src={url + "/images/" + image} alt="" />

        {!cartItems[id]
          ? <img className='w-9 absolute bottom-4 right-4 cursor-pointer rounded-full' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" /> : <div className='absolute bottom-5 right-4 items-center flex gap-3 p-1.5 rounded-custom bg-white'>
            <img className='w-7' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p> {cartItems[id]} </p>
            <img className='w-7' onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>}
      </div>

      <div className='p-5'>

        <div className='flex justify-between items-center mb-3'>
          <p className='text-xl font-medium'>{name}</p>
          <img className='w-16 hidden sm:block' src={assets.rating_starts} alt="" />
        </div>
        <p className='text-sm hidden sm:block'>{description}</p>
        <p className='text-red-500 text-2xl font-medium mt-2.5 mb-2.5 ml-0 mr-0'>₹ {price}</p>
      </div>

    </div>
  )
}

export default FoodItem