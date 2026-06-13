import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../../assets/assets'


const List = () => {

  // delete food item form admin panel
  const deleteFood = async (foodId) => {
    const response = await axios.post(
      `${url}/api/food/remove`,
      { id: foodId },
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    )
    await fetchlist()
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }

  }
  // display food item in admin pannel
  const [list, setList] = useState([])
  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("error")
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  return (
    <div className="w-full px-4 md:px-8 py-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Food Items
        </h2>
        <p className="text-gray-500 mt-1">
          Manage all food items available in your store
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}

        <div className="hidden md:grid grid-cols-[100px_1.5fr_1fr_120px_120px] gap-4 bg-gray-50 p-4 border-b border-gray-200 font-semibold text-gray-700">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* Food List */}

        {list.map((item) => (
          <div
            key={item._id}
            className="grid md:grid-cols-[100px_1.5fr_1fr_120px_120px] gap-4 items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition"
          >

            {/* Image */}

            <img
              className="w-16 h-16 rounded-lg object-cover border"
              src={`${url}/images/${item.image}`}
              alt={item.name}
            />

            {/* Name */}

            <div>
              <p className="font-medium text-gray-800">
                {item.name}
              </p>
            </div>

            {/* Category */}

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">
                {item.category}
              </span>
            </div>

            {/* Price */}

            <p className="font-semibold text-gray-800">
              ₹ {item.price}
            </p>

            {/* Delete */}

            <button
              onClick={() => deleteFood(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Delete
            </button>

          </div>
        ))}

        {list.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No food items found
          </div>
        )}

      </div>

    </div>
  )
}

export default List