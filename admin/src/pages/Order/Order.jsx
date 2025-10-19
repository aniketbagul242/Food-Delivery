import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { url } from '../../assets/assets'

const Order = () => {
  const [order, setOrder] = useState([])

  const fetchOrder = async () => {
    const response = await axios.get(`${url}/api/order/list`);

    if (response.data.success) {
      setOrder(response.data.data)
      //console.log(response.data.data);

    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchOrder()
    }

  }

  useEffect(() => {
    fetchOrder();
  }, [])


  return (
    <div id='order'>
      <h3>Order Page</h3>
      <div id='order-list'>
        {order.map((order, index) => {
          return <div className='grid grid-cols-custom-2 items-start gap-8 border-solid border-red-500 border p-5 mt-8 mb-8 mr-0 ml-0 text-base text-gray-500' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='font-semibold' id='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='font-semibold mt-8 mb-1.5 ' id='order-item-name'> {order.address.firstname + " " + order.address.lastname}</p>
              <div className='mb-2.5' id='order-item-address'>
                <p> {order.address.street + ","}   </p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p id='order-item-phone'>{order.address.phone}</p>
            </div>
            <p> Items: {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <p>{order.paymentMethod}</p>
            <select className='bg-slate-200 border border-red-500 border-solid w-40 p-2.5 outline-none' onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        })}
      </div>

    </div>
  )
}

export default Order