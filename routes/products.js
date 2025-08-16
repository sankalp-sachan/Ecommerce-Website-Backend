import express from "express";
import { products } from "../data/products.js";

const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// Get by category
router.get("/category/:category", (req, res) => {
  const category = req.params.category;
  if (category === "all") return res.json(products);
  const filtered = products.filter(p => p.category === category);
  res.json(filtered);
});

export default router;
