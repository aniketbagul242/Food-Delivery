import React, { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext'

const FoodDisplay = ({category}) => {
  const {food_list}=useContext(StoreContext)

  return (
    <div id='food-display' className='mt-8'>
        <h2 className='text-2xl font-semibold'>Top dishes near you</h2>

       <div className='grid sm:grid-cols-auto-fill-minmax grid-cols-2 gap-8 mt-8 gap-y-12 ml-9 sm:ml-0  '>
        {food_list.map((item, index)=>{
          if(category==="All" || category===item.category){
            return <FoodItem id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
       </div>

    </div>

  )
}

export default FoodDisplay