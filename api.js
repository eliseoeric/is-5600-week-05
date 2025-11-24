// api.js
const path = require('path');
const Products = require('./products');
const autoCatch = require('./lib/auto-catch');
const Orders = require('./orders');

/**
 * Handle the root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List products
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  });

  res.json(products);
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
async function editProduct(req, res) {
  const product = await Products.edit(req.params.id, req.body);
  res.json(product);
}

/**
 * Delete a product
 */
async function deleteProduct(req, res) {
  const result = await Products.destroy(req.params.id);
  res.json(result);
}

/**
 * Create an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(orders)
}

/**
 * List orders
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}

async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  })

  res.json(orders)
}

async function editOrder (req, res, next) {
  const updated = await Orders.edit(req.params.id, req.body)
  res.json(updated)
}

async function deleteOrder (req, res, next) {
  await Orders.destroy(req.params.id)
  res.json({ deleted: true })
}


module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});
