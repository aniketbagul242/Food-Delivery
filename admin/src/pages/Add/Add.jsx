import React, {useState } from 'react'
import { assets, url } from '../../assets/assets'
import { url } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {

const [image , setImage]=useState(false);
const [data, setData]=useState({
    name:"",
    description:"",
    price: "",
    category:"Salad"
})

const onChangeHandler =(event)=>{
 const name =event.target.name;
 const value =event.target.value;
 setData(data=>({...data,[name]:value}))
}
 
const onSubmitHandler =async (event)=>{
  event.preventDefault();
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("price", Number(data.price))
  formData.append("category", data.category)
  formData.append("image", image)
  const response = await axios.post(`${url}/api/food/add`,formData)
   
  if(response.data.success){
    setData({
        name:"",
        description:"",
        price: "",
        category:"Salad"
    })
    setImage(false)
    toast.success(response.data.message)
  } 
  else{
   toast.error(response.data.message)
  }
   
}

  return (
    <div className=' ml-40  w-[70%] mt-8 text-gray-500 text-base 
    ' id='add'>
<form className='gap-6 flex flex-col ' id='flex-col' onSubmit={onSubmitHandler}>
    <div className='gap-8  flex flex-col ' id='upload'>
        <p>Upload Image</p>
        <label htmlFor="image">
            <img className='w-28 ' src={image ?URL.createObjectURL(image) :assets.upload_area} alt="" />
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
    </div>
    <div className='gap-8 flex flex-col w-1/2 ' id='product-name'>
        <p>Product name</p>
        <input onChange={onChangeHandler} value={data.name} className='p-3 border border-gray-400' type="text" name='name' placeholder='Type here' />
    
    </div>
    <div className='gap-8 flex flex-col w-1/2' id='product-desc'>
        <p>Product description</p>
        <textarea onChange={onChangeHandler} value={data.description} className='p-3 border border-gray-400' name="description"  rows="6" placeholder='Write content here'></textarea>
    </div>
    <div className='flex gap-8 flex-col sm:flex-row' id=' add-categoty-price'>
        <div id='add-category'>
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} className='w-48 p-3 border border-gray-400' name="category" id="">
                <option value="Salad"> Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
            </select>
        </div>
        <div className='gap-8 ' id='add-price'>
            <p>Product price</p>
            <input className='w-48 p-3 border border-gray-400' type="Number" name='price' placeholder='200' onChange={onChangeHandler} value={data.price}  />
        </div>
    </div>
    <button className='border-none w-28 p-3 bg-black text-white cursor-pointer' type='submit' id='add-btn'>ADD</button>
</form>

    </div>
  )
}

export default Add