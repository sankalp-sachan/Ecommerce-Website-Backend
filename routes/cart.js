import express from "express";
import { products } from "../data/products.js";

const router = express.Router();
let cart = []; // In-memory cart (replace with DB in production)

// Get cart
router.get("/", (req, res) => {
  res.json(cart);
});

// Add to cart
router.post("/", (req, res) => {
  const { id, quantity } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id, quantity });
  }
  res.json(cart);
});

// Update quantity
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;
  const item = cart.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  item.quantity = quantity;
  res.json(cart);
});

// Remove item
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(i => i.id !== id);
  res.json(cart);
});

export default router;
