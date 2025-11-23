import React, { useContext, useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setSearchQuery } = useContext(StoreContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Sync search to context 
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    return () => clearTimeout(delay);
  }, [inputValue]);

  // Navigate to search page
  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/search?query=${inputValue.trim()}`);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="w-full flex justify-center mt-6 sm:mt-4 px-4">
        <div className="
      flex items-center w-full max-w-[600px] 
      bg-white shadow-md border border-gray-200 rounded-full 
      px-3 sm:px-5 py-1"
        >
          <input
            type="text"
            placeholder="Search salad, rolls, pasta, cake..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent p-0.5 text-gray-700 rounded-full focus:outline-none text-sm sm:text-base" />

          <button onClick={handleSearch} className=" bg-red-500 hover:bg-red-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full  transition-all duration-200 flex-shrink-0 text-sm sm:text-base " >
            Search
          </button>
        </div>
      </div>

      {/*  Hero Section */}
      <div className="flex justify-center items-center h-auto sm:h-[500px] mt-2 sm:mt-4 animate-fadeIn">
        <div className="pb-8 sm:pb-0" id="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Left Content */}
            <div className="flex flex-col justify-center text-center sm:text-left order-2 sm:order-1 pt-1 sm:pt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold px-4 sm:px-10 pb-4">
                It's not just Food, it's an Experience
              </h1>
              <p className="text-sm sm:text-base font-normal px-4 sm:px-10 pb-4 text-gray-700">
                Imagine you don't need a diet because we provide healthy and
                delicious food for you! We are providing the best food delivery services.
              </p>
              <div className="flex items-center px-4 sm:px-10">
                <AnchorLink offset={50} href="#menu">
                  <button className="bg-red-500 text-white py-2 px-6 rounded-xl hover:bg-red-600 transition-all">
                    View Menu
                  </button>
                </AnchorLink>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 sm:order-2 flex justify-center items-center min-h-[300px] sm:min-h-[450px] relative">
              <img
                className="w-[250px] sm:w-[400px] lg:w-[500px] drop-shadow-xl"
                src="burger_logo.png"
                alt="Burger"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
