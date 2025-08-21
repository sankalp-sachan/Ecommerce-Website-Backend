import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  cart: [
    {
      id: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  orderId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
