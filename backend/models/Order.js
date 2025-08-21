import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
