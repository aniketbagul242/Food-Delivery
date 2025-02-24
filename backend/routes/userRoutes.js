import { loginUser, userRegister } from "../controlers/userControler.js";
import express from "express"

const userRouter = express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/register",userRegister)

export default userRouter;