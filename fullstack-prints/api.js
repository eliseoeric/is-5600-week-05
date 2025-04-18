const express = require('express');
const Product = require('./models/Product');
const router = express.Router();

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.json(products); // Send products as JSON response
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;
