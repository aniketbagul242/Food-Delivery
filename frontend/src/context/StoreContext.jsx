import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-backned.onrender.com"

    const [token, setToken] = useState("")
    const [food_list, setFoodlist] = useState([])


    //adding item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            toast.success("Added to Cart")
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            toast.success("Added to Cart")
        }
        if (token) {
            try {
                const response = await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })

            }
            catch (err) {
                console.log(err);
            }
        }
    }


    //removing item form cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            try {
                const response = await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
            } catch (error) {
                console.log(error);

            }
        }
    }



    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(product => product._id === item);
                if (itemInfo) { // Check if itemInfo exists
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount; // Ensure this is outside the loop
    };



    //getting food list
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodlist(response.data.data)
    }


    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        console.log(response.data)
        setCartItems(response.data.cartData)
    }


    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            let token = localStorage.getItem("token");
            if (token) {
                setToken(token)
                await loadCartData(token);
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider
