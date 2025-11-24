const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

const Orders = require('./orders')
/**
 * Handle the root route
 * @param {object} req
@@ -27,7 +27,6 @@ async function listProducts(req, res) {
  }))
}


/**
 * Get a single product
 * @param {object} req
@@ -50,8 +49,8 @@ async function getProduct(req, res, next) {
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
  const product = await Products.create(req.body)
  res.json(product)
}

/**
@@ -61,8 +60,15 @@ async function createProduct(req, res) {
 * @param {function} next
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

async function editOrder(req, res, next) {
  const change = req.body
  const order = await Orders.edit(req.params.id, change)
  res.json(order)
}

/**
@@ -72,7 +78,31 @@ async function editProduct(req, res, next) {
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

async function deleteOrder(req, res, next) {
  const response = await Orders.destroy(req.params.id)
  res.json(response)
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

module.exports = autoCatch({
@@ -81,5 +111,9 @@ module.exports = autoCatch({
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
});
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});