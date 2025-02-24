import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Header = () => {
  return (
    <>
      <div className="flex justify-center items-center h-auto sm:h-[500px] mt-28 sm:mt-1 animate-fadeIn ">
        <div className="pb-8 sm:pb-0" id="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center text-center sm:text-left order-2 sm:order-1 pt-12 sm:pt-0 -mt-12 sm:-mt-24">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold px-4 sm:px-10 pb-4">
                It's not just Food, it's an Experience
              </h1>
              <p className="text-sm sm:text-base font-normal px-4 sm:px-10 pb-4 ">
                Imagine you don't need a diet because we provide healthy and delicious food for you! We are
                providing the best food delivery services.
              </p>
              <div className="flex items-center px-4 sm:px-10">
                <AnchorLink className="anchor-link" offset={50} href="#menu">
                  <button className="bg-red-500 text-white py-2 px-6 rounded-xl">View Menu</button>
                </AnchorLink>
              </div>
            </div>

            <div className="order-1 sm:order-2 flex justify-center items-center min-h-[300px] sm:min-h-[450px] relative">
              <div>
                <img className="w-[250px] sm:w-[400px] lg:w-[500px]" src="burger.png" alt="Burger" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
