import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    items :{
        type:Array,
        required:true
    },
    amount : {
        type:Number,
        required:true
    },
    address: {
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food Proccessing"

    },
    date:{
        type:Date,
        default:Date.now()
    },
    paymentMethod: { // Change to string to indicate the method of payment
        type: String,
        default: "Cash on Delivery" // Default to COD
    }

})

const orderModel  = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel;