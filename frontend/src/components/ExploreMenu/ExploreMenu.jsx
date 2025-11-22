
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id="menu" className="flex flex-col gap-5 mt-8 sm:mt-2 px-4 sm:px-8 ">
      <h1 className="font-medium text-3xl sm:text-4xl">Explore our menu</h1>
      <p className="max-w-[80%] sm:max-w-[60%] hidden sm:block">
        Choose from a diverse menu featuring a delectable array of dishes, our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div
        id="menu-list"
        className="flex overflow-x-scroll  items-center justify-start sm:justify-between gap-5 my-5 px-1"
      >
        {menu_list.map((item, index) => {
          const isSelected = category === item.menu_name;
          return (
            <div
              key={index}
              onClick={() =>
                setCategory(prev => (prev === item.menu_name ? "All" : item.menu_name))
              }
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isSelected
                  ? "border-4 border-tomato shadow-lg bg-tomato/10"
                  : "border-2 border-transparent hover:border-gray-200"
                  }`}
              >
                <img
                  className="w-24 sm:w-28 min-w-[70px] sm:min-w-[100px] rounded-2xl"
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-tomato/20 rounded-2xl pointer-events-none"></div>
                )}
              </div>
              <p
                className={`mt-3 text-lg transition-colors duration-300 ${isSelected
                  ? "text-tomato font-semibold"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="my-2.5 mx-0 h-0.5 text-gray-200 border-0" />
    </div>
  )
}

export default ExploreMenu;