const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

// Products
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
}

async function getProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)
  if (!product) return next()
  return res.json(product)
}

async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}

async function editProduct(req, res) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

async function deleteProduct(req, res) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

// Orders
async function createOrder (req, res) {
  const order = await Orders.create(req.body)
  res.json(order)
}

async function listOrders (req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query
  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  })
  res.json(orders)
}

async function editOrder (req, res, next) {
  const change = req.body
  const order = await Orders.edit(req.params.id, change)
  if (!order) return next()
  res.json(order)
}

async function deleteOrder (req, res) {
  await Orders.destroy(req.params.id)
  res.json({ success: true })
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
  editOrder,
  deleteOrder
})

