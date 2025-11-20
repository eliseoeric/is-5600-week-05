const express = require("express");
const mongoose = require("mongoose");
const productsRouter = require("./routes/products");

const app = express();
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/productsDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ROUTES
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
