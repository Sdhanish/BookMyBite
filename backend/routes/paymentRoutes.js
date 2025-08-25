// backend/routes/payments.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { createPaymentIntent } from "../utils/stripeIntent.js";

const router = express.Router();

// GET all payments for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const payments = await Payment.find({ user: req.user._id })
    .populate("order")
    .sort({ createdAt: -1 });
  res.json({ payments });
});

/**
 * STEP 1: Create PaymentIntent + Order + Payment (cart is NOT cleared yet)
 */
router.post("/pay", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items to pay" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.recipe.price * item.quantity,
      0
    );

    // Create order (pending)
    const order = await Order.create({
      user: req.user._id,
      items: items.map(i => ({
        recipe: i.recipe._id,
        quantity: i.quantity,
      })),
      totalAmount,
      status: "pending",
    });

    // Create Stripe PaymentIntent
    const paymentIntent = await createPaymentIntent(
      totalAmount,
      {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },
      "inr"
    );

    // Create payment record (pending)
    const payment = await Payment.create({
      user: req.user._id,
      order: order._id,
      amount: totalAmount,
      status: "pending",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      order,
      payment,
    });
  } catch (err) {
    console.error(" Payment error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
});

/**
 * STEP 2: Confirm payment success (called from frontend after Stripe confirmation)
 */
router.post("/confirm", authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    // Update order & payment
    const order = await Order.findOneAndUpdate(
      { _id: orderId, user: req.user._id },
      { status: "paid" },
      { new: true }
    );

    const payment = await Payment.findOneAndUpdate(
      { _id: paymentId, user: req.user._id },
      { status: "succeeded" },
      { new: true }
    );

    if (!order || !payment) {
      return res.status(404).json({ message: "Order or Payment not found" });
    }
    // Clear from cart ONLY the items that were in this order
    const recipeIds = order.items.map(i => i.recipe);
    await Cart.updateOne(
      { user: req.user._id },
      {
        $pull: {
          items: { recipe: { $in: recipeIds } },
        },
      }
    );

    res.status(200).json({
      message: "Payment confirmed, order marked as paid & cart updated",
      order,
      payment,
    });
  } catch (err) {
    console.error("Confirm error:", err);
    res.status(500).json({ message: "Failed to confirm payment", error: err.message });
  }
});


export default router;
