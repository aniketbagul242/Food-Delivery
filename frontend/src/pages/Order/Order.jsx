import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Order = () => {
  const navigate = useNavigate()

  const { getTotalCartAmount, url, token, food_list, cartItems } = useContext(StoreContext)

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("cash") // Track payment method

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }))
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method); // Update the payment method
  }

  const orderPlace = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40, // Delivery fee added
    }

    // If payment is cash on delivery, don't include payment method data
    if (paymentMethod === "cash") {
      orderData.paymentMethod = "COD";
    } else {
      orderData.paymentMethod = "online";
    }

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        if (paymentMethod === "online") {
          window.location.replace(session_url); // Redirect to online payment if method is online
        } else {
          toast.success("Order placed successfully.");
          navigate("/myorders"); // Navigate to the orders page if COD is selected

        }
      } else {
        toast.error("Error placing the order.");
      }
    } catch (error) {
      toast.error("An error occurred ");
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  return (
    <form onSubmit={orderPlace} className='flex items-start justify-between gap-12 mt-24 flex-col sm:flex-row' id='order'>
      <div className='w-full sm:w-2/5 ' id='left'>
        <p className='text-3xl font-medium mb-12' id='title'>Delivery Information</p>
        {/* Form fields */}
        <div className='flex gap-3' id='field'>
          <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='First Name' onChange={onChangeHandler} name="firstname" value={data.firstname} required />
          <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='Last Name' onChange={onChangeHandler} name="lastname" value={data.lastname} required />
        </div>
        <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='Email address' onChange={onChangeHandler} name="email" value={data.email} required />
        <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='Street' onChange={onChangeHandler} name="street" value={data.street} required />
        <div className='flex gap-3' id='field'>
          <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='City' onChange={onChangeHandler} name="city" value={data.city} required />
          <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='State' onChange={onChangeHandler} name="state" value={data.state} required />
        </div>
        <div className='flex gap-3' id='field'>
          <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='Zip code' onChange={onChangeHandler} name="zipcode" value={data.zipcode} required />
          <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='Country' onChange={onChangeHandler} name="country" value={data.country} required />
        </div>
        <input className='w-full mb-4 p-3 border border-r-gray-300 rounded outline-red-500' type="text" placeholder='Phone' onChange={onChangeHandler} name="phone" value={data.phone} required />
      </div>

      <div className='w-2/5' id='right'>
        <div className='flex flex-1 flex-col gap-5 ' id='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='flex justify-between text-gray-600' id='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='justify-between flex' id='total'>
              <p>Delivery Fee</p>
              <p>{40}</p>
            </div>
            <hr className='mt-2.5 mb-2.5 ml-0 mr-0' />
            <div className='flex justify-between'>
              <b>Total</b>
              <b>{getTotalCartAmount() + 40}</b>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className="flex items-center">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => handlePaymentMethodChange("cash")}
                className="mr-2"
              />
              <label htmlFor="cashOnDelivery" className="text-black bg-yellow-400 rounded-3xl pl-1 pr-1">Cash on Delivery</label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="onlinePayment"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => handlePaymentMethodChange("online")}
                className="mr-2"
              />
              <label htmlFor="onlinePayment" className="text-black bg-yellow-400 rounded-3xl pl-1 pr-1">Payment Online</label>
            </div>
          </div>

          <button type='submit' className='border-none text-white bg-green-700 w-56 pt-3 pb-3 pr-0 pl-0 rounded cursor-pointer mt-4 hover:bg-green-600'>
            Place Order
          </button>
        </div>
      </div>
    </form>
  )
}

export default Order;
