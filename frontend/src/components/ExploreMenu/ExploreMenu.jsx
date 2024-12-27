
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='flex flex-col gap-5 mt-36 sm:mt-2'>
      <h1 className='font-medium text-3xl '>Explore our menu</h1>
      <p className='max-w-60p hidden sm:block'>choose from a diverse menu featuring a delectable array of dishes, our mission is satisfy your cravings and elavates your dining experience, one delicious meal at a time </p>

      <div id='menu-list' className='flex items-center justify-between gap-7 text-center my-5 mx-0 overflow-x-scroll'>

        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index}>

              <img className={`w-28 min-w-20 rounded-custom duration-200 ${category === item.menu_name ? 'border-4 border-tomato p-0.5' : ""}`}
                src={item.menu_image} alt="" />

              <p className='mt-3 text-lg cursor-pointer text-gray-400'>{item.menu_name}</p>
            </div>
          )

        })}
      </div>
      <hr className='my-2.5 mx-0 h-0.5 text-gray-200 border-0' />
    </div>
  )
}

export default ExploreMenu



