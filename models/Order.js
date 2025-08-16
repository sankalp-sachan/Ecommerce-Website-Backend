import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  fullName: String,
  email: String,
  address: String,
  payment: String,
  cart: [
    {
      id: Number,
      quantity: Number
    }
  ],
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
