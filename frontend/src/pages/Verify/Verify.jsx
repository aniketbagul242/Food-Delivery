import { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams(); 
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });

        if (response.data.success) {
          toast.success("Order placed successfully!");
          navigate("/myorders");
        } else {
          toast.error("Payment failed. Order cancelled.");
          navigate("/");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        toast.error("An error occurred during payment verification.");
        navigate("/");
      }
    };

    verifyPayment();
  }, [success, orderId]);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="border-t-8 border-purple-500 w-20 h-20 rounded-full animate-spin shadow-lg"></div>
      </div>
    </div>
  );
};

export default Verify;
