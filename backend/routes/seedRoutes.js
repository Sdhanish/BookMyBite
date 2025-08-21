import express from "express";
import Recipe from "../models/Recipe.js";
import recipes from "../data/recipes.js";

const router = express.Router();

// Seed recipes into DB
router.post("/recipes", async (req, res) => {
  try {
    await Recipe.deleteMany(); // Clear old recipes
    const inserted = await Recipe.insertMany(recipes);
    res.json({ message: "Recipes seeded successfully", data: inserted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
