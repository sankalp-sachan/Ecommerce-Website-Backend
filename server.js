import express from "express";
import cors from "cors";
import productsRoute from "./routes/products.js";
import cartRoute from "./routes/cart.js";
import checkoutRoute from "./routes/checkout.js";
import mongoose from "mongoose";

// Replace with your MongoDB URI
const MONGO_URI = "mongodb://127.0.0.1:27017/nexusmart"; // local MongoDB
// OR for Atlas: const MONGO_URI = "mongodb+srv://username:password@cluster.mongodb.net/nexusmart";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
