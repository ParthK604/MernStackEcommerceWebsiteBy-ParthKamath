import express from "express"
import { createOrder } from "../controller/ordercontroller.js";
import authmiddleware from "../middleware/authmiddleware.js";
const router=express.Router();
router.post("/",authmiddleware,createOrder);
export default router;