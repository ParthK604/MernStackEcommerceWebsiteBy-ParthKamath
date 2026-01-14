import Order from "../models/Order.js";

export async function createOrder(req, res) {
  try {
    const { items, address, totalAmount } = req.body;

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
