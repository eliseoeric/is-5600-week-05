const Products = require('./products')
const Orders = require('./orders')
const path = require('path')
const autoCatch = require('./lib/auto-catch')
/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts (req, res) {
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
async function getProduct (req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) return next()

  return res.json(product)
}

/**
 * Create a product
 * @param {object} req
 * @param {object} res
 */
async function createProduct (req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 */
async function editProduct (req, res, next) {
  const product = await Products.edit(req.params.id, req.body)
  res.json(product)
}

/**
 * Delete a product
 * @param {object} req
 * @param {object} res
 */
async function deleteProduct (req, res, next) {
  const result = await Products.destroy(req.params.id)
  res.json(result)
}

/**
 * Create an order
 * @param {object} req
 * @param {object} res
 */
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * List orders
 * @param {object} req
 * @param {object} res
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
 * Get a single order
 * @param {object} req
 * @param {object} res
 */
async function getOrder (req, res, next) {
  const order = await Orders.get(req.params.id)
  if (!order) return next()
  res.json(order)
}

/**
 * Edit an order
 * @param {object} req
 * @param {object} res
 */
async function editOrder (req, res, next) {
  const order = await Orders.edit(req.params.id, req.body)
  res.json(order)
}

/**
 * Delete an order
 * @param {object} req
 * @param {object} res
 */
async function deleteOrder (req, res, next) {
  const result = await Orders.destroy(req.params.id)
  res.json(result)
}
module.exports = autoCatch({
  handleRoot,
  // products
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  // orders
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
})
