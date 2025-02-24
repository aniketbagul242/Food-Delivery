import { useContext, useEffect } from 'react';
import {  useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Verify = () => {
    const [seacrchParams, setSearchParams] = useSearchParams();
    const success = seacrchParams.get("success")
    const orderId = seacrchParams.get("orderId")
    
    const {url} = useContext(StoreContext)
    const navigate =useNavigate();

    const verifyPayment = async () => {
      try {
          const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
          
          if (response.data.success) {
              // Redirect to the myorders page if successful
              navigate("/myorders");
          } else {
              // Redirect to the home page if not successful
              navigate("/");
          }
      } catch (error) {
          // Handle errors (e.g. network issues, API errors)
          console.error("Payment verification failed:", error);
          navigate("/");
      }
  };


 useEffect(()=>{
    verifyPayment();
 },[])
    

  return (
    <div classNameNameName='min-h-[60vh] grid' >
<div class="flex justify-center items-center min-h-screen">
  <div class="border-t-8 border-purple-500 border-solid w-24 h-24 rounded-full animate-spin shadow-lg"></div>
</div>
</div>

  )
}

export default Verify