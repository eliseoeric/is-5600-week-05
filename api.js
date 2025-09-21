const Products = require('./products')
const Orders = require('./orders')

async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

async function editProduct(req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
  res.json(products)
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  res.json(product)
}

async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

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

async function editOrder(req, res, next) {
  const change = req.body
  const order = await Orders.edit(req.params.id, change)
  res.json(order)
}

async function deleteOrder(req, res, next) {
  await Orders.destroy(req.params.id)
  res.json({ ok: true })
}

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  listProducts,
  getProduct,
  createOrder,
  listOrders,
  editOrder,
  deleteOrder
}
