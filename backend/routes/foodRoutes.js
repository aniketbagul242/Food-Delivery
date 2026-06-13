import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"
import adminAuth from "../middleware/adminAuth.js"

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (res, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


const foodRouter = express.Router();

foodRouter.post(
    "/add",
    adminAuth,
    upload.single("image"),
    addFood
)

foodRouter.get("/list", listFood)

foodRouter.post(
    "/remove",
    adminAuth,
    removeFood
)





export default foodRouter