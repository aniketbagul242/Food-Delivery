import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
   const [currState, setCurrState] = useState("Login")
   const [loading, setLoading] = useState(false);

   const { url, setToken } = useContext(StoreContext)
   const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
   })

   const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData((data) => ({ ...data, [name]: value }))
   }

   const onLogin = async (e) => {
      e.preventDefault()
      setLoading(true); // start loading
      let newUrl = url

      try {
         newUrl += currState === "Login" ? "/user/login" : "/user/register"
         const response = await axios.post(newUrl, data)

         if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)

            toast.success(`${currState === "Login" ? "Logged in" : "Account created"} successfully!`, {
               position: "top-center",
               autoClose: 3000,
            });

            setShowLogin(false);
         } else {
            toast.error(response.data.message || "Something went wrong")
         }
      } catch (error) {
         toast.error("Network or server error")
      } finally {
         setLoading(false); // stop loading
      }
   }

   return (
      <div className='absolute z-10 w-full h-full bg-black bg-opacity-50 grid'>
         <form onSubmit={onLogin} className='place-self-center w-auto md:w-[350px] text-gray-500 bg-white flex flex-col gap-6 pt-6 pb-6 pr-8 pl-8 rounded-lg text-base animate-fade'>

            <div className='flex justify-between items-center text-black'>
               <h2>{currState}</h2>
               <img className='w-4 cursor-pointer' onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className='flex flex-col gap-5'>
               {currState === "Sign Up" && (
                  <input
                     className='outline-none border border-gray-300 p-3 rounded'
                     type="text"
                     placeholder='Your name'
                     required
                     name="name"
                     onChange={onChangeHandler}
                     value={data.name}
                  />
               )}
               <input
                  className='outline-none border border-gray-300 p-3 rounded'
                  type="email"
                  placeholder='Your email'
                  required
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
               />
               <input
                  className='outline-none border border-gray-300 p-3 rounded'
                  type="password"
                  placeholder='Password'
                  required
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
               />
            </div>

            <button
               type='submit'
               disabled={loading}
               className={`border-0 p-3 rounded text-white text-base cursor-pointer transition-colors duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
            >
               {loading ? (
                  <div className='flex justify-center items-center gap-2'>
                     <div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
                     <span>
                        {currState === "Login" ? "Logging in..." : "Creating account..."}
                     </span>

                  </div>
               ) : (
                  currState === "Sign Up" ? "Create account" : "Login"
               )}
            </button>

            <div className='flex items-start gap-2 -mt-4'>
               <input className='mt-1' type="checkbox" required />
               <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>

            {currState === "Login" ? (
               <p>Create a new account? <span className='text-red-500 font-medium cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            ) : (
               <p>Already have an account? <span className='text-red-500 font-medium cursor-pointer' onClick={() => setCurrState("Login")}>Login here</span></p>
            )}

         </form>
      </div>
   )
}

export default LoginPopup
