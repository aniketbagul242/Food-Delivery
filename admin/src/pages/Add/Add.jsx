import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { url } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(
            `${url}/api/food/add`,
            formData,
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
        )
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }

    }

    return (
        <div className="w-full flex justify-center px-4 py-8">

            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Add New Food Item
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Create and manage food items for your menu
                    </p>
                </div>

                <form
                    onSubmit={onSubmitHandler}
                    className="flex flex-col gap-6"
                >

                    {/* Upload Image */}

                    <div>
                        <p className="mb-3 font-medium text-gray-700">
                            Upload Image
                        </p>

                        <label
                            htmlFor="image"
                            className="cursor-pointer"
                        >
                            <img
                                className="w-32 h-32 rounded-xl border border-gray-300 object-cover hover:opacity-90 transition"
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : assets.upload_area
                                }
                                alt=""
                            />
                        </label>

                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            hidden
                            required
                        />
                    </div>

                    {/* Product Name */}

                    <div>
                        <p className="mb-2 font-medium text-gray-700">
                            Product Name
                        </p>

                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                            placeholder="Enter food name"
                            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-500"
                        />
                    </div>

                    {/* Description */}

                    <div>
                        <p className="mb-2 font-medium text-gray-700">
                            Product Description
                        </p>

                        <textarea
                            name="description"
                            rows="5"
                            value={data.description}
                            onChange={onChangeHandler}
                            placeholder="Write description here..."
                            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-500"
                        />
                    </div>

                    {/* Category + Price */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <p className="mb-2 font-medium text-gray-700">
                                Category
                            </p>

                            <select
                                name="category"
                                value={data.category}
                                onChange={onChangeHandler}
                                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-500"
                            >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>

                        <div>
                            <p className="mb-2 font-medium text-gray-700">
                                Price
                            </p>

                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={onChangeHandler}
                                placeholder="₹ 200"
                                className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:border-emerald-500"
                            />
                        </div>

                    </div>

                    {/* Button */}

                    <button
                        type="submit"
                        className="w-full md:w-48 bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-all"
                    >
                        Add Item
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Add
