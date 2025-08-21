import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productsRoute from "./routes/products.js";
import cartRoute from "./routes/cart.js";
import checkoutRoute from "./routes/checkout.js";

// Create express app
const app = express();

// ✅ Middleware
app.use(cors({
  origin: ["https://ecommerce-website-pi-one.vercel.app"], // frontend domain (no trailing slash)
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB connection
// Locally → will use mongodb://127.0.0.1:27017/nexusmart
// On Render → will use process.env.MONGO_URI (set in Render dashboard)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://<E-commerce>:<Sankalp@2007>@cluster0.xxxxx.mongodb.net/nexususer?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Routes
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("NexusMart backend is running 🚀");
});

// ✅ Port (Render requirement)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


