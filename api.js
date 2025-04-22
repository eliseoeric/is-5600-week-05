const express = require('express');
const Product = require('./models/Product');
const Order = require('./models/Order');
const orderService = require('./order');

const router = express.Router();

/**
 * GET /api/products
 */
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * POST /api/products
 */
router.post('/products', async (req, res) => {
  try {
    const { title, price, tags } = req.body;
    const product = new Product({ title, price, tags });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

/**
 * GET /api/orders
 */
router.get('/orders', async (req, res) => {
  try {
    const orders = await orderService.list();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * POST /api/orders
 */
router.post('/orders', async (req, res) => {
  try {
    const { productIds } = req.body;
    const order = await orderService.create(productIds);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create order' });
  }
});

module.exports = router;