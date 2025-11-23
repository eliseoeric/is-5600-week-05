// api.js
const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

// ---- Handlers ----
async function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}

// PRODUCTS
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  const items = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  });
  res.json(items);
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) return next();
  res.json(product);
}

async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.json(product);
}

async function editProduct(req, res, next) {
  const { id } = req.params;
  const change = req.body;
  const updated = await Products.edit(id, change);
  if (!updated) return next();
  res.json(updated);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const result = await Products.destroy(id);
  res.json(result);
}

// ORDERS
async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  });
  res.json(orders);
}

async function getOrder(req, res, next) {
  const { id } = req.params;
  const order = await Orders.get(id);
  if (!order) return next();
  res.json(order);
}

async function editOrder(req, res, next) {
  const { id } = req.params;
  const change = req.body;
  const updated = await Orders.edit(id, change);
  if (!updated) return next();
  res.json(updated);
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const result = await Orders.destroy(id);
  res.json(result);
}
async function editOrder (req, res) {
  const updated = await Orders.edit(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not Found' });
  res.json(updated);
}
async function deleteOrder (req, res) {
  await Orders.destroy(req.params.id);
  res.status(204).end();
}
module.exports = autoCatch({
  handleRoot,
  listProducts, getProduct, createProduct, editProduct, deleteProduct,
  listOrders, createOrder, editOrder, deleteOrder
});

module.exports = autoCatch({
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
});
