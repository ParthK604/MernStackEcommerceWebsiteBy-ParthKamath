import express from "express"
import { createOrder, createRazorpayOrder } from "../controller/ordercontroller.js";
import authmiddleware from "../middleware/authmiddleware.js";
const router=express.Router();

router.post("/razorpay", authmiddleware, createRazorpayOrder);
router.post("/",authmiddleware,createOrder);

export default router;