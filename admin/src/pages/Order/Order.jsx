import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { url } from '../../assets/assets'

const Order = () => {
  const [order, setOrder] = useState([])

  const fetchOrder = async () => {
    const response = await axios.get(
      `${url}/api/order/list`,
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    );

    if (response.data.success) {
      setOrder(response.data.data)
      // console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      `${url}/api/order/status`,
      {
        orderId,
        status: event.target.value
      },
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    )

    if (response.data.success) {
      await fetchOrder()
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [])



return (
  <div className='w-full px-4 md:px-8 py-6'>
    
    <div className='mb-6'>
      <h2 className='text-2xl font-bold text-gray-800'>
        Orders
      </h2>
      <p className='text-gray-500 mt-1'>
        Manage customer orders and delivery status
      </p>
    </div>

    <div className='flex flex-col gap-5'>
      {order.map((order, index) => (
        <div
          key={index}
          className='bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all'
        >

          <div className='flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between'>

            {/* Left Section */}
            <div className='flex gap-4 flex-1'>

              <img
                className='w-14 h-14'
                src={assets.parcel_icon}
                alt=""
              />

              <div className='flex flex-col gap-2'>

                <p className='font-semibold text-gray-800 leading-7'>
                  {order.items.map((item, index) =>
                    index === order.items.length - 1
                      ? item.name + " x " + item.quantity
                      : item.name + " x " + item.quantity + ", "
                  )}
                </p>

                <div>
                  <p className='font-semibold text-gray-700'>
                    {order.address.firstname}{" "}
                    {order.address.lastname}
                  </p>

                  <p className='text-gray-500 text-sm'>
                    {order.address.street}
                  </p>

                  <p className='text-gray-500 text-sm'>
                    {order.address.city},{" "}
                    {order.address.state},{" "}
                    {order.address.country},{" "}
                    {order.address.zipcode}
                  </p>

                  <p className='text-gray-600 text-sm mt-1'>
                    📞 {order.address.phone}
                  </p>
                </div>

              </div>
            </div>

            {/* Right Section */}
            <div className='flex flex-col sm:flex-row lg:flex-col gap-4 lg:min-w-[220px]'>

              <div className='bg-gray-50 rounded-xl p-3'>
                <p className='text-sm text-gray-500'>
                  Total Items
                </p>
                <p className='font-semibold text-gray-800'>
                  {order.items.length}
                </p>
              </div>

              <div className='bg-gray-50 rounded-xl p-3'>
                <p className='text-sm text-gray-500'>
                  Amount
                </p>
                <p className='font-semibold text-emerald-600'>
                  ₹ {order.amount}
                </p>
              </div>

              <div className='bg-gray-50 rounded-xl p-3'>
                <p className='text-sm text-gray-500'>
                  Payment
                </p>
                <p className='font-semibold text-gray-800'>
                  {order.paymentMethod}
                </p>
              </div>

              <select
                className='border border-gray-300 rounded-xl p-3 outline-none focus:border-emerald-500 bg-white'
                onChange={(event) =>
                  statusHandler(event, order._id)
                }
                value={order.status}
              >
                <option value="Food Processing">
                  Food Processing
                </option>
                <option value="Out For Delivery">
                  Out For Delivery
                </option>
                <option value="Delivered">
                  Delivered
                </option>
              </select>

            </div>

          </div>

        </div>
      ))}
    </div>

  </div>
)
}

export default Order;