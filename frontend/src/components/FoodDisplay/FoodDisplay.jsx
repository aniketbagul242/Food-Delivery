import React, { useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter by category only
  const filteredFood = food_list.filter((item) => {
    return category === "All" || item.category === category;
  });

  return (
    <div id="food-display" className="mt-8">
      <h2 className="text-2xl font-semibold">Top Dishes Near You</h2>

      <div className="grid grid-cols-2 sm:grid-cols-auto-fill-minmax 
     gap-8 mt-8 gap-y-12 justify-items-center sm:justify-items-start">

        {filteredFood.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
