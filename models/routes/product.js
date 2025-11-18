const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Path must be correct


/**
 * Test Product Data
 * {
 *   "name": "Laptop",
 *   "price": 899,
 *   "description": "Test product"
 * }
 */

// GET all products
router.get("/", async (req, res) => {
  try {
    console.log("Trying to fetch products...");       // <-- debug start
    const products = await Product.find();
    console.log("Products fetched:", products);       // <-- debug result
    res.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error); // <-- original error log
    res.status(500).json({ error: "Error fetching products" });
  }
});



// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("GET /products/:id error:", error);
    res.status(400).json({ error: "Invalid product ID" });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("POST /products error:", error);
    res.status(400).json({ error: "Error creating product", details: error.message });
  }
});


// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (error) {
    console.error("PUT /products/:id error:", error);
    res.status(400).json({ error: "Error updating product", details: error.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /products/:id error:", error);
    res.status(400).json({ error: "Error deleting product" });
  }
});

module.exports = router;
