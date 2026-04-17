import express from "express"
import { createOrder, createRazorpayOrder, getMyOrders } from "../controller/ordercontroller.js";
import authmiddleware from "../middleware/authmiddleware.js";
const router=express.Router();

router.get("/myorders", authmiddleware, getMyOrders);
router.post("/razorpay", authmiddleware, createRazorpayOrder);
router.post("/",authmiddleware,createOrder);

export default router;