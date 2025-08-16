import express from "express";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order.js";

const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
  const { fullName, email, address, payment, cart } = req.body;

  if (!fullName || !email || !address || !payment || !cart?.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const orderId = "ORD-" + uuidv4().split("-")[0].toUpperCase();

  try {
    const newOrder = new Order({
      orderId,
      fullName,
      email,
      address,
      payment,
      cart
    });
    await newOrder.save();

    res.json({
      message: "Order placed successfully",
      orderId
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
