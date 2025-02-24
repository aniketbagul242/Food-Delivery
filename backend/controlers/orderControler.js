import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    const { userId, items, amount, address, paymentMethod } = req.body;

    try {
        let newOrderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod,
            status: 'Food Processing'

        };


        const newOrder = new orderModel(newOrderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // If the payment method is online, create the Stripe session
        if (paymentMethod === 'online') {
            const line_items = items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name, // Assuming item has a 'name' field
                    },
                    unit_amount: item.price * 100,  // Convert to smallest unit (cents)
                },
                quantity: item.quantity,
            }));

            // Add delivery charges
            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charges",
                    },
                    unit_amount: 40 * 100,  // Convert delivery charge to smallest unit
                },
                quantity: 1,
            });

            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            });

            return res.json({ success: true, session_url: session.url });  // Redirect to Stripe checkout session
        }

        // If COD, we don't need to handle Stripe, so just return success
        res.json({ success: true, message: "Order placed successfully (COD)" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}



const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body; // success is "true" or "false"

    try {
        if (success === "true") {
            // Update the order if payment is successful
            await orderModel.findByIdAndUpdate(orderId, {
                paymentMethod: 'online',   // Ensure the payment method is marked as 'online'
                paymentStatus: true,       // Mark payment as completed

            });

            res.json({ success: true, message: "Payment successful and order confirmed" });
        } else {
            // Delete the order if payment failed or was canceled
            await orderModel.findByIdAndDelete(orderId);

            res.json({ success: false, message: "Payment failed or canceled, order deleted" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying order" });
    }
}

export default verifyOrder;

// user order
const userOrders = async (req, res) => {
    try {
        const order = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: order })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}


// listing order for admin pannel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

//api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}



export { placeOrder, userOrders, listOrders, updateStatus, verifyOrder };
