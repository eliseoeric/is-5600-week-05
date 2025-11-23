const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/** PRODUCTS **/

// List all products
async function listProducts(req, res) {
  const { offset = 0, limit = 25 } = req.query

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit)
  })

  res.json(products)
}

// Get a single product
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  if (!product) return next()
  res.json(product)
}

// Create a new product
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

// Edit a product
async function editProduct(req, res) {
  const product = await Products.edit(req.params.id, req.body)
  res.json(product)
}

// Delete a product
async function deleteProduct(req, res) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

/** ORDERS **/

// Create an order
async function createOrder(req, res) {
  const order = await Orders.create(req.body)
  res.json(order)
}

// List orders
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

// Get one order
async function getOrder(req, res, next) {
  const order = await Orders.get(req.params.id)
  if (!order) return next()
  res.json(order)
}

// Edit an order
async function editOrder(req, res) {
  const order = await Orders.edit(req.params.id, req.body)
  res.json(order)
}

// Delete an order
async function deleteOrder(req, res) {
  const response = await Orders.destroy(req.params.id)
  res.json(response)
}

module.exports = autoCatch({
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
