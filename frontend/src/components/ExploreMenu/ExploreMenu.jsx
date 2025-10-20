
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id="menu" className="flex flex-col gap-5 mt-8 sm:mt-2 px-4 sm:px-8 ">
      <h1 className="font-medium text-3xl sm:text-4xl">Explore our menu</h1>
      <p className="max-w-[80%] sm:max-w-[60%] hidden sm:block">
        Choose from a diverse menu featuring a delectable array of dishes, our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div id="menu-list" className="flex overflow-x-scroll sm:overflow-x-hidden items-center justify-start sm:justify-between gap-4 sm:gap-7 my-5 mx-0">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              key={index}
              className="flex flex-col items-center"
            >
              <img
                className={`w-24 sm:w-28 min-w-[70px] sm:min-w-[100px] rounded-custom duration-200 ${category === item.menu_name ? 'border-4 border-tomato p-1' : ""}`}
                src={item.menu_image}
                alt=""
              />
              <p className="mt-3 text-lg cursor-pointer text-gray-400">{item.menu_name}</p>
            </div>
          )
        })}
      </div>

      <hr className="my-2.5 mx-0 h-0.5 text-gray-200 border-0" />
    </div>
  )
}

export default ExploreMenu;