const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
 * Root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * List products
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
 */
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)

  if (!product) return next()

  res.json(product)
}

/**
 * ✅ Create product (DB)
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * ✅ Edit product
 */
async function editProduct(req, res) {
  const product = await Products.edit(req.params.id, req.body)
  res.json(product)
}

/**
 * ✅ Delete product
 */
async function deleteProduct(req, res) {
  const result = await Products.destroy(req.params.id)
  res.json(result)
}

/**
 * ✅ Create Order
 */
async function createOrder(req, res) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * ✅ List Orders
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
 * ✅ Edit Order
 */
async function editOrder(req, res) {
  const order = await Orders.edit(req.params.id, req.body)
  res.json(order)
}

/**
 * ✅ Delete Order
 */
async function deleteOrder(req, res) {
  await Orders.destroy(req.params.id)
  res.json({ status: 'deleted' })
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
