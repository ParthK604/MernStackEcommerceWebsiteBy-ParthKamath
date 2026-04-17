import Order from "../models/Order.js";
import Razorpay from "razorpay";

export async function createRazorpayOrder(req, res) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: Math.round(req.body.amount * 100), 
      currency: "INR", // test mode usually defaults well with INR
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ message: "Razorpay error" });
  }
}

export async function createOrder(req, res) {
  try {
    const { items, address, totalAmount, status } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    
    const newOrder = new Order({
      userId: req.userId,  
      items,
      address,
      totalAmount,
      status: status || "PLACED"
    });

    await newOrder.save();
    return res.status(201).json({
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving order" });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
}
