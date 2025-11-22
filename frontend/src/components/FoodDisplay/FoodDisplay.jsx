import React, { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  return (
    <div id='food-display' className='mt-8 px-4 sm:px-0'>
  <h2 className='text-2xl font-semibold text-center sm:text-left'>Top dishes near you</h2>

<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 justify-items-center'>

    {food_list.map((item) => {
      if (category === "All" || category === item.category) {
        return (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        )
      }
    })}
  </div>
</div>

  )
}

export default FoodDisplay