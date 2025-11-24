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
  res.sendFile(path.join(__dirname, 'index.html'))
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function listProducts(req, res, next) {
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
 * @param {function} next
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
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.status(201).json(product)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)

  if (!product) {
    return next()
  }

  res.json(product)
}

/**
 * Delete a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function deleteProduct(req, res, next) {
  const deleted = await Products.destroy(req.params.id)

  if (!deleted) {
    return next()
  }

  // 204 = No Content
  res.status(204).send()
}

/**
 * Create an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.status(201).json(order)
}

/**
 * Edit an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editOrder(req, res, next) {
  const updatedOrder = await Orders.edit(req.params.id, req.body)

  if (!updatedOrder) {
    return next()
  }

  res.json(updatedOrder)
}

/**
 * Delete an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function deleteOrder(req, res, next) {
  const deleted = await Orders.destroy(req.params.id)

  if (!deleted) {
    return next()
  }

  res.status(204).send()
}

/**
 * List all orders
 * @param {object} req
 * @param {object} res
 * @param {function} next
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

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  editOrder,
  deleteOrder
})
