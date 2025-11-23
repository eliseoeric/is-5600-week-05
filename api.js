// api.js
const Products = require('./products')
const Orders = require('./orders')

/** PRODUCTS */

// List
async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
  res.json(products)
}

// Get
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  res.json(product)
}

// Create
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

// Edit
async function editProduct(req, res, next) {
  const product = await Products.edit(req.params.id, req.body)
  res.json(product)
}

// Delete
async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

/** ORDERS */

// List
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

// Create
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

// Edit
async function editOrder(req, res, next) {
  const order = await Orders.edit(req.params.id, req.body)
  res.json(order)
}

// Delete
async function deleteOrder(req, res, next) {
  const response = await Orders.destroy(req.params.id)
  res.json(response)
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
}
