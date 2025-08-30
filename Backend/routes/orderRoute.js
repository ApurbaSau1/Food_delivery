import express from "express"
import authMiddleware from"../middleware/auth.js" 
import { placeOrder,verifyorder,userOrders,listOrder,updateOrderStatus } from "../controllers/orderController.js"

const router = express.Router()

router.post("/place", authMiddleware, placeOrder)
router.post("/verify", verifyorder)
router.post("/userorders",authMiddleware,userOrders)
router.get("/list",listOrder)
router.post("/status",updateOrderStatus)

export default router