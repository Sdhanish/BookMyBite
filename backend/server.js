// server.js
import 'dotenv/config'; 
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";


console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY ? "yes" : "no");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set");

connectDB();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/seed", seedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
