import userModel from "../models/userModel.js";
//add items to user cart
const addToCart = async (req, res) => {
   
    try {
        const userData= await userModel.findOne({ _id: req.body.userId });
        const cartData=await userData.cartData;

        if (!cartData[req.body.itemId])
             {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // user.cart.push({ productId, quantity });

        // await user.save();
        res.status(200).json({ message: "Item added to cart", cart: updatedUser.cartData });

    } catch (error) {
        res.status(400).json({ message: "Error adding item to cart", error });
        // console.log(error);
        
    }
};
//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData=await userData.cartData;
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        if (cartData[req.body.itemId]>0)
             {
            cartData[req.body.itemId] -= 1;
            }
          
        const updatedUser = await userModel.findByIdAndUpdate(req.body.userId, { cartData });
       
        
        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(400).json({ message: "Error removing item from cart" });
        console.log(error);
    }
};
//fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);

        const cartData= await userData.cartData;
        if (!userData) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json({ cartData });
    } 
    catch (error) {
        res.status(400).json({ message: "Error fetching cart data", error });
    }
};
export { addToCart, removeFromCart, getCart }