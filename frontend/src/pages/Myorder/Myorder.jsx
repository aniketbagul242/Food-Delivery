import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Myorder = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    setData(response.data.data)
    console.log(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrder();
    }

  }, [token])

  return (
    <>
      <div className='mt-12 mb-12 ml-0 mr-0 ' id='my-order'>
        <h2>My Orders</h2>

        <div className='flex flex-col gap-5 mt-8' id='container'>
          {data.map((order, index) => {
            return (
              <div className='grid grid-cols-custom-3 items-center gap-8 text-base pt-2.5 pb-2.5 pr-5 pl-5 border-red-500 border-solid ' id='my-orders-order' key={index}>

                <img className='w-12' src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item, index) => {
                  if (index == order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity, ""
                  }
                })}</p>
                <p>{order.amount}</p>
                <p>Items:{order.items.length}</p>
                <p> <span className='text-red-500'>&#x25cf;</span> <b>{order.status}</b> </p>
                <button className='border-none pt-3 pb-3 pr-0 pl-0 rounded cursor-pointer bg-slate-300 text-gray-500' onClick={fetchOrder}>Track Order</button>
              </div>
            )

          })}
        </div>
      </div>

    </>
  )
}

export default Myorder