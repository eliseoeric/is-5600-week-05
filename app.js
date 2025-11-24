import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());

// ------------------
// CONNECT TO MONGODB
// ------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ------------------
// ROUTES
// ------------------
import productsRouter from "./products.js";  // If your file is in routes folder, use "./routes/products.js"
app.use("/products", productsRouter);

// ------------------
// START SERVER
// ------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
