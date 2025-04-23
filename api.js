const express = require('express');
const products = require('./products'); // Mongo logic
const orders = require('./orders');    // Mongo logic

const router = express.Router();

// ─── ROOT ────────────────────────────────────────────────

function handleRoot(req, res) {
  res.send('✅ Fullstack Prints API is up!');
}

// ─── PRODUCTS ────────────────────────────────────────────

async function listProducts(req, res) {
  try {
    const list = await products.list(req.query);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list products' });
  }
}

async function getProduct(req, res) {
  try {
    const product = await products.get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get product' });
  }
}

async function createProduct(req, res) {
  try {
    const created = await products.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create product' });
  }
}

async function editProduct(req, res) {
  try {
    const updated = await products.edit(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update product' });
  }
}

async function deleteProduct(req, res) {
  try {
    await products.destroy(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
}

// ─── ORDERS ──────────────────────────────────────────────

async function listOrders(req, res) {
  try {
    const list = await orders.list(req.query);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list orders' });
  }
}

async function getOrder(req, res) {
  try {
    const order = await orders.get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get order' });
  }
}

async function createOrder(req, res) {
  try {
    const created = await orders.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create order' });
  }
}

async function editOrder(req, res) {
  try {
    const updated = await orders.edit(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update order' });
  }
}

async function deleteOrder(req, res) {
  try {
    await orders.destroy(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete order' });
  }
}

// ─── EXPORT HANDLERS FOR USE IN app.js ───────────────────

module.exports = {
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  getOrder,
  createOrder,
  editOrder,
  deleteOrder
};