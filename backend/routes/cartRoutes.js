import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Cart from "../models/Cart.js";
import Recipe from "../models/Recipe.js";
import { calculateTotalPrice } from "../utils/calculateTotal.js";

const router = express.Router();

// Add item to cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) return res.status(400).json({ message: "Recipe ID is required" });

    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Find cart for user or create new
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Prevent duplicates
    const itemExists = cart.items.some(item => item.recipe.toString() === recipeId);
    if (itemExists) return res.status(400).json({ message: "Item already in cart" });

    // Add item with default quantity 1
    cart.items.push({ recipe: recipeId, quantity: 1 });
    await cart.save();

    await cart.populate("items.recipe");

    // Calculate total price
       const totalPrice = calculateTotalPrice(cart.items);

    res.status(200).json({ cart, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.recipe");
    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });

        const totalPrice = calculateTotalPrice(cart.items);

    res.json({ cart, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update quantity
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { recipeId, quantity } = req.body;
    if (!recipeId || quantity < 1)
      return res.status(400).json({ message: "Invalid data" });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.recipe.toString() === recipeId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.recipe");

    const totalPrice = calculateTotalPrice(cart.items);

    res.json({ cart, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.delete("/remove/:recipeId", authMiddleware, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.recipe.toString() !== recipeId);
    await cart.save();
    await cart.populate("items.recipe");

      const totalPrice = calculateTotalPrice(cart.items);
      
    res.json({ cart, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
