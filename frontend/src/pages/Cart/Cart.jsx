import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext)

  // handle checkout
  const handleProceedCheckout = () => {
    if (!token) {
      toast.error("Please Login to continue", { position: "top-center", autoClose: 3000 })
      return;
    }
    else {
      navigate("/order")
    }
  }

  const navigate = useNavigate()
  return (
    <>
      <div className='mt-24'>
        <div id='items'>
          <div className='grid grid-cols-custom-2 items-center text-gray-400 text-base space-x-3 ' id='items-title'>
            <p>Itmes</p>
            <p>Title</p>
            <p>Price</p>
            <p>Queantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <>
                  <div className='mt-3 mb-3 ml-0 mr-0 text-black grid grid-cols-custom-2 items-center space-x-3' id='item-title'>
                    <img className='w-14' src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]} </p>
                    <p>{item.price * cartItems[item._id]} </p>
                    <p onClick={() => removeFromCart(item._id)} className='cursor-pointer'>x</p>
                  </div>
                  <hr className='h-0.5 bg-gray-200 bottom-0' />
                </>

              )
            }
          })}

        </div>
        <div className='flex mt-20 justify-between gap-5 ' id='cart-bottom'>
          <div className='flex flex-1 flex-col gap-5' id='cart-total'>
            <h2>Cart Total</h2>
            <div>
              <div className='flex justify-between text-gray-600' id='cart-total-details'>
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='justify-between flex' id='total'>
                <p>Delivery Fee</p>
                <p> {getTotalCartAmount() === 0 ? 0 : 40}</p>
              </div>
              <hr className='mt-2.5 mb-2.5 ml-0 mr-0' />
              <div className='flex justify-between'>
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
              </div>

            </div>
            <button onClick={handleProceedCheckout} className='border-none text-white bg-red-600 w-56 pt-3 pb-3 pr-0 pl-0 rounded cursor-pointer hover:bg-red-500'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </>
  )
}


export default Cart
