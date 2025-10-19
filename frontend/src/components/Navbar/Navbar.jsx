import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import AnchorLink from 'react-anchor-link-smooth-scroll';


const Navbar = ({ setShowLogin, contactRef }) => {

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  }
  const NavlinkCSS = ({ isActive }) => {
    return {
      paddingBottom: isActive ? "2px" : "",
      borderBottom: isActive ? "solid 1px" : ""
    }
  }

  const scrollHandler = (ref) => {
    console.log(ref.current);

    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });

    }
  };


  return (
    <div className='px-0 py-5 flex justify-between items-center '>


      <Link to='/'>  <img src="logo3.png" alt="" className='w-24 sm:hidden ' /> <img src="logo2.png" className='hidden sm:block sm:w-60' alt="" />  </Link>
      <ul className=' list-none gap-5 text-lg cursor-pointer hidden custom-lg:flex  '>
        <NavLink style={NavlinkCSS} to='/'><li>home</li></NavLink>
        <AnchorLink className='anchor-link' offset={50} href='#menu'> <li>menu</li></AnchorLink>

        <li onClick={() => scrollHandler(contactRef)}>contact-us</li>


      </ul>

      <div className='flex sm:items-center sm:gap-8  '>
        <div className='relative md:ml-6'>
          <Link to='/cart'><img className='w-9' src="bag.png" alt="" /> </Link>
          < div className={`${getTotalCartAmount() === 0 ? "" : 'absolute min-w-2 min-h-2 bg-red-500 rounded-md -top-2 -right-2'}`}> </div>

        </div>


        {!token ? <button className=' bg-red-500 text-white text-base border py-2 px-7 border-solid  rounded-3xl cursor-pointer hover:bg-red-400 ml-4  ' onClick={() => setShowLogin(true)} >sign in</button> : <div className='relative group' id='profile'>
          <img className='cursor-pointer ml-10' src={assets.profile_icon} alt="" />
          <ul className='absolute hidden group-hover:flex flex-col  gap-2.5 pb-3 pt-3 pl-6 pr-6 bg-white rounded border border-red-500 border-solid outline outline-white list-none right-0 z-10 ' id='profile-dropdown'>
            <Link to="/myorders"> <li className='flex cursor-pointer gap-2 items-center' >
              <img className='w-5' src={assets.bag_icon} alt="" />
              <p className='hover:text-red-500'>Orders</p> </li> </Link>
            <hr />
            <li onClick={logout} className='flex cursor-pointer gap-2 items-center' > <img className='w-5' src={assets.logout_icon} alt="" /><p className='hover:text-red-500'>Logout</p></li>
          </ul>
        </div>}

      </div>

    </div>

  )
}

export default Navbar