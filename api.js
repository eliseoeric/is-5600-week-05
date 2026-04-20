const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle root route
 * @param {Object} req
 * @param {Object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * List products
 * @param {Object} req
 * @param {Object} res
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
 * Get one product
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)

  if (!product) {
    return next()
  }

  res.json(product)
}

/**
 * Create product
 * @param {Object} req
 * @param {Object} res
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit product
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function editProduct(req, res, next) {
  const product = await Products.edit(req.params.id, req.body)

  if (!product) {
    return next()
  }

  res.json(product)
}

/**
 * Delete product
 * @param {Object} req
 * @param {Object} res
 */
async function deleteProduct(req, res) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

/**
 * List orders
 * @param {Object} req
 * @param {Object} res
 */
async function listOrders(req, res) {
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
 * Get one order
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function getOrder(req, res, next) {
  const order = await Orders.get(req.params.id)

  if (!order) {
    return next()
  }

  res.json(order)
}

/**
 * Create order
 * @param {Object} req
 * @param {Object} res
 */
async function createOrder(req, res) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * Edit order
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function editOrder(req, res, next) {
  const order = await Orders.edit(req.params.id, req.body)

  if (!order) {
    return next()
  }

  res.json(order)
}

/**
 * Delete order
 * @param {Object} req
 * @param {Object} res
 */
async function deleteOrder(req, res) {
  const response = await Orders.destroy(req.params.id)
  res.json(response)
}

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
})