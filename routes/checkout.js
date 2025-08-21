import express from "express";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order.js";

const router = express.Router();

// POST /api/checkout
router.post("/", async (req, res) => {
  try {
    const { fullName, email, address, payment, cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Generate a unique order ID
    const orderId = uuidv4();

    // Create and save new order
    const newOrder = new Order({
      fullName,
      email,
      address,
      payment,
      cart,
      orderId
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

export default router;
