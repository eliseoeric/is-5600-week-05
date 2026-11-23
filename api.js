
const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * List all products
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
}

/**
 * Get a single product
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)

  if (!product) {
    return next()
  }

  return res.json(product)
}

/**
 * Create a product
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.status(201).json(product)
}

/**
 * Edit a product
 */
async function editProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.edit(id, req.body)

  if (!product) {
    return next()
  }

  res.json(product)
}

/**
 * Delete a product
 */
async function deleteProduct(req, res, next) {
  const { id } = req.params

  const result = await Products.destroy(id)

  if (result.deletedCount === 0) {
    return next()
  }

  res.json({ success: true })
}

/**
 * List all orders
 */
async function listOrders(req, res) {
  res.json(await Orders.list())
}

/**
 * Create a new order
 */
async function createOrder(req, res) {
  const order = await Orders.create(req.body)
  res.status(201).json(order)
}

/**
 * Edit an existing order
 */
async function editOrder(req, res, next) {
  const { id } = req.params

  const order = await Orders.edit(id, req.body)

  if (!order) {
    return next()
  }

  res.json(order)
}

/**
 * Delete an order
 */
async function deleteOrder(req, res, next) {
  const { id } = req.params

  const result = await Orders.destroy(id)

  if (result.deletedCount === 0) {
    return next()
  }

  res.json({ success: true })
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
})
