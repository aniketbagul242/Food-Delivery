import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../../assets/assets'


const List = () => {

// delete food item form admin panel
const deleteFood = async (foodId)=>{
 const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
   await fetchlist()
   if(response.data.success){
    toast.success(response.data.message)
   }
   else{
    toast.error("Error")
   }
   
}
   // display food item in admin pannel
const [list, setList] =useState([])
  const fetchlist = async ()=>{
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data);
    
    if(response.data.success){
       setList(response.data.data)
    }
    else{
      toast.error("error")
    }
  }

  useEffect(()=>{
    fetchlist()
  },[])

  return (
    <>
    
    <div className='flex flex-col gap-3 w-[70%] '>
      <p>All Food List</p>

      <div  id='list-table'>

        <div className='grid grid-cols-custom items-center gap-3 p-4 border border-gray-200 text-base' id='list-format'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          const imageurl = `${url}/images/${item.image}`
          console.log(imageurl);
          
          return (
            <div className='grid grid-cols-custom items-center gap-3 p-4 border border-gray-200 text-base bg-gray-300  ' key={index} id='table-fomrat'>
              <img className='w-14' src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p className='cursor-pointer' onClick={()=>deleteFood(item._id)}>X</p>
            </div>
          )

        })}
      </div>
    </div>
    </>
  )
}

export default List