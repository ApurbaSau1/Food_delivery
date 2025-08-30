import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const url = "https://food-delivery-backend-bu4t.onrender.com";
    const [token, setToken] = useState("");

    const [food_list,setFoodList] = useState([]);

    const addToCart =async (ItemId) => {
        if (!cartItems[ItemId]) {
            setCartItems((prev) => ({ ...prev, [ItemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
        }
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId: ItemId }, { headers: { token } });
        }
    }
    const removeFromCart = async(ItemId) => {
        setCartItems((prev) => (
            { ...prev, [ItemId]: prev[ItemId] - 1 }
        )
        );
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId: ItemId }, { headers: { token } });
        }
    }
    const clearcart = (ItemId) => {
        setCartItems((prev) => (
            { ...prev, [ItemId]: prev[ItemId] - prev[ItemId] }
        )
        );
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    //fetch food list from server
    const fetchFoodList=async()=>{
            try {
            const response = await axios.get(`${url}/api/food/list`);
            const data = response.data;
            setFoodList(data.foods);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }
    const loadCartData=async(token)=>{   
            try {
                const response = await axios.post(url+"/api/cart/get",{},{ headers: { token } });
                const data = response.data;
                setCartItems(data.cartData);

            } catch (error) {
                console.error("Error loading cart data:", error);
            }
        
    }

    //for token stored in localStorage and when i refresh the page
    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            await loadCartData(storedToken);
            
        }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearcart,
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
export default StoreContextProvider;
