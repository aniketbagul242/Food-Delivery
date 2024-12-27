
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";
    const { userId, items, amount, address } = req.body;

    try {
        // Create the new order with COD status
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Cash on Delivery', // Add a payment method field
           // status: 'Pending', // Set initial status
        });
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare the response
        res.json({
            success: true,
            orderId: newOrder._id,
            message: 'Order placed successfully. Payment will be collected upon delivery.',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}

   // user order
     const userOrders =async (req,res)=>{
           try {
            const order = await orderModel.find({userId:req.body.userId})
            res.json({success:true, data:order})
           } catch (error) {
            console.log(error);
            res.json({success:false, message:"Error"})
            
           }
     }
     

     // listing order for admin pannel
    const listOrders = async (req,res)=>{

         try {
            const orders = await orderModel.find({})
            res.json({success:true, data:orders})
            
         } catch (error) {
         console.log(error);
         res.json({success:false, message:"Error"})
         
         }
    }

    //api for updating order status
    const updateStatus = async (req,res)=>{
       try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"Status updated"})
       } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
       }
    }



export { placeOrder, userOrders,listOrders, updateStatus };
