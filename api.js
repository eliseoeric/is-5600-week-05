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

/**
 * List all products
 * @param {object} req
 * @param {object} res
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
 * @param {object} req
 * @param {object} res
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
 * Create a new product
 * @param {object} req
 * @param {object} res
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 */
async function editProduct(req, res) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
 * Delete a product
 * @param {object} req
 * @param {object} res
 */
async function deleteProduct(req, res) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

/**
 * Create an order
 * @param {object} req
 * @param {object} res
 */
async function createOrder(req, res) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * List orders
 * @param {object} req
 * @param {object} res
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
 * Get a single order
 * @param {object} req
 * @param {object} res
 */
async function getOrder(req, res, next) {
  const { id } = req.params

  const order = await Orders.get(id)
  if (!order) {
    return next()
  }
  
  return res.json(order)
}

/**
 * Edit an order
 * @param {object} req
 * @param {object} res
 */
async function editOrder(req, res) {
  const change = req.body
  const order = await Orders.edit(req.params.id, change)
  res.json(order)
}

/**
 * Delete an order
 * @param {object} req
 * @param {object} res
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
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
})