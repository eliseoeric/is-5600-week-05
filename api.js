const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 * @param {Request} req
 * @param {Response} res
 */
function handleRoot(req, res) {
  res.send('Welcome to the API!');
}

/**
 * Get a product by ID
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id);
  if (!product) return next();
  res.json(product);
}

/**
 * Create a new product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function createProduct(req, res, next) {
  const product = await Products.create(req.body);
  res.json(product);
}

/**
 * Update a product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function editProduct(req, res, next) {
  const change = req.body;
  const product = await Products.edit(req.params.id, change);
  res.json(product);
}

/**
 * Delete a product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id);
  res.json(response);
}

/**
 * Create an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body);
  res.json(order);
}

/**
 * List orders with optional filters
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query;

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });

  res.json(orders);
}

module.exports = autoCatch({
  handleRoot,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
});
