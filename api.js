// api.js
const Products = require('./products')
const Orders = require('./orders')

// ---------- Product Handlers ----------

// Create Product
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

// List Products
async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query
  const products = await Products.list({ 
    offset: Number(offset), 
    limit: Number(limit), 
    tag 
  })
  res.json(products)
}

// Get Product
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  res.json(product)
}

// Edit Product
async function editProduct(req, res, next) {
  const product = await Products.edit(req.params.id, req.body)
  res.json(product)
}

// Delete Product
async function deleteProduct(req, res, next) {
  const result = await Products.destroy(req.params.id)
  res.json(result)
}

// ---------- Order Handlers ----------

// Create Order
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

// List Orders
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

// Get Order
async function getOrder(req, res, next) {
  const order = await Orders.get(req.params.id)
  res.json(order)
}

// Edit Order
async function editOrder(req, res, next) {
  const order = await Orders.edit(req.params.id, req.body)
  res.json(order)
}

// Delete Order
async function deleteOrder(req, res, next) {
  const result = await Orders.destroy(req.params.id)
  res.json(result)
}

// Exports
module.exports = {
  createProduct,
  listProducts,
  getProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
}
