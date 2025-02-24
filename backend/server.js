import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import connectDB  from "./config/db.js"

import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"


const app =express()

const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/user",userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res)=>{
    res.send("API Working")
})

app.listen(PORT,()=>{
    console.log(`Server Started on http://localhost:${PORT}`)
})

