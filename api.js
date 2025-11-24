// api.js
const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

// PRODUCTS ROUTES

/**
 * Create a new product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function createProduct (req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * List products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
  res.json(products)
}

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)
  if (!product) return next()
  return res.json(product)
}

/**
 * Update a product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
 * Delete a product
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

// ORDERS ROUTES

/**
 * Create an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
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

/**
 * Get an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getOrder (req, res, next) {
  const order = await Orders.get(req.params.id)
  if (!order) return next()
  res.json(order)
}

/**
 * Update an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function editOrder (req, res, next) {
  const change = req.body
  const order = await Orders.edit(req.params.id, change)
  res.json(order)
}

/**
 * Delete an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function deleteOrder (req, res, next) {
  const response = await Orders.destroy(req.params.id)
  res.json(response)
}

module.exports = autoCatch({
  handleRoot,
  // Products
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  // Orders
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
});