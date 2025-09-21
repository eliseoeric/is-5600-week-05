// api.js
const Products = require('./products')
const Orders = require('./orders')

/**
 * Create a new product
 */
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * List products with optional filters
 */
async function listProducts(req, res, next) {
  const { offset, limit, tag } = req.query
  const products = await Products.list({
    offset: Number(offset) || 0,
    limit: Number(limit) || 25,
    tag
  })
  res.json(products)
}

/**
 * Get single product by id
 */
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  res.json(product)
}

/**
 * Edit a product
 */
async function editProduct(req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
 * Delete a product
 */
async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

/**
 * Create an order
 */
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * List orders
 */
async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query
  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  })
  res.json(orders)
}

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
}
