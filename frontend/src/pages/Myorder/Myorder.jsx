import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Myorder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="mt-12 mb-12 px-4 sm:px-6 lg:px-10" id="my-order">
      <h2 className="text-2xl font-semibold text-gray-800">My Orders</h2>

      <div className="flex flex-col gap-6 mt-8">
        {data.map((order, index) => (
          <div
            key={index}
            className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-5
                       flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          >
            {/* Left Section */}
            <div className="flex items-start gap-4">
              <img
                className="w-12 h-12"
                src={assets.parcel_icon}
                alt="Parcel"
              />

              <div>
                <p className="text-gray-900 font-medium">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity}
                      {i !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {order.items.length} Item(s)
                </p>
              </div>
            </div>

            {/* Middle Section */}
            <div className="flex flex-col sm:text-center">
              <p className="text-gray-700 font-semibold">₹{order.amount}</p>
              <p className="text-sm text-gray-500">Total Amount</p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-lg">&#x25cf;</span>
              <p className="font-semibold text-gray-700 capitalize">
                {order.status}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={fetchOrder}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 
                         px-4 py-2 rounded-lg font-medium 
                         transition-all"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myorder;
