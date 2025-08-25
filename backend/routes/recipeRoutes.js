import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

// Get all recipes (products)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get all recipes without authentication(products)
router.get("/public", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
