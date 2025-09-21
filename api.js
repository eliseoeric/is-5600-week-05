// api.js

const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

// Root handler
async function handleRoot(req, res, next) {
  res.json({ message: "API is running" });
}

// Products handlers
async function createProduct(req, res, next) {
  const product = await Products.create(req.body);
  res.json(product);
}

async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;
  const products = await Products.list({ offset, limit, tag });
  res.json(products);
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id);
  res.json(product);
}

async function editProduct(req, res, next) {
  const change = req.body;
  const product = await Products.edit(req.params.id, change);
  res.json(product);
}

async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id);
  res.json(response);
}

// Orders handlers
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query;

  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  });

  res.json(orders);
}

// Export all handlers wrapped in autoCatch
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder
});
