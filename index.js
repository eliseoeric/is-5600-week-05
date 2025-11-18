require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.error("DB Connection Error:", err);
    process.exit(1); // Stop server if DB fails
});

.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.error("DB Connection Error:", err);
    process.exit(1); // Exit app if DB connection fails
});

// Routes
app.use("/api/products", productRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
