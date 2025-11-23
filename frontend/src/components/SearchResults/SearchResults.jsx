import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { food_list, searchQuery } = useContext(StoreContext);
  const navigate = useNavigate();

  const filtered = food_list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-28 px-4 max-w-[1200px] mx-auto animate-fadeIn">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
      >
        ← Back to Home
      </button>

      <h2 className="text-3xl font-semibold mb-4">
        Search results for: <span className="text-red-500">{searchQuery}</span>
      </h2>

      {filtered.length === 0 ? (
        <p className="text-gray-600 text-lg mt-10">
          😕 No results found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
          {filtered.map((item) => (
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
      )}
    </div>
  );
};

export default SearchResults;
