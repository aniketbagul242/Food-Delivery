import userModel from "../models/userModel.js";


//add item to cart
const addCart = async(req,res)=>{
try {
    
    const userData = await userModel.findById(req.body.userId)

    let cartData = await userData.cartData || {}

    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] =1
    }
    else{
        cartData[req.body.itemId] +=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData})
    res.json({success:true, message:"Added To Cart"})

      } 

    catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
         }

}


//remove item from cart
const removeCart = async (req, res) => {
    try {
        // Fetch user data
        let userData = await userModel.findById(req.body.userId);
        
        // Check if user data is found
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData 
        let cartData = userData.cartData || {}

        // Check if the item exists in the cart
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the item count is zero, remove the item from cartData
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            return res.json({ success: true, message: "Item removed from cart" });

        } else {
            return res.status(400).json({ success: false, message: "Item not in cart or already at zero" });
        }

    } catch (error) {
        console.error( error);
        res.status(500).json({ success: false, message: "error" });
    }
};



//fetch user cart data
const getCart = async(req,res)=>{
 try {
    let userData = await userModel.findById(req.body.userId);

    if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData || {}
    res.json({success:true, cartData:cartData})
 } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
 }
}


export{addCart, removeCart, getCart}


