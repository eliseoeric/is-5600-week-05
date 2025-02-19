const path = require('path');
const Products = require('./products');
const Orders = require('./orders'); // Import the orders module
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }));
}

/**
 * Get a single product
 */
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) return next();
  res.json(product);
}

/**
 * Create a product
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.json(product);
}

/**
 * Edit a product
 */
async function editProduct(req, res, next) {
  const product = await Products.edit(req.params.id, req.body);
  res.json(product);
}

/**
 * Delete a product
 */
async function deleteProduct(req, res, next) {
  await Products.destroy(req.params.id);
  res.json({ success: true });
}

// Register Order Endpoints
async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  res.json(await Orders.list({ offset: Number(offset), limit: Number(limit), productId, status }));
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
});
