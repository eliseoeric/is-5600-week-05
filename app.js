const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Routes
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

