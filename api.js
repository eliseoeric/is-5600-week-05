const path = require("path")
const Products = require("./products")
const Orders = require("./orders")

/* HOME */
async function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"))
}

/* PRODUCTS */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query
  res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }))
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  if (!product) return next()
  res.json(product)
}

async function createProduct(req, res) {
  res.json(await Products.create(req.body))
}

async function editProduct(req, res) {
  res.json(await Products.edit(req.params.id, req.body))
}

async function deleteProduct(req, res) {
  res.json(await Products.destroy(req.params.id))
}

/* ORDERS */
async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query
  res.json(await Orders.list({ offset, limit, productId, status }))
}

async function createOrder(req, res) {
  res.json(await Orders.create(req.body))
}

async function getOrder(req, res, next) {
  const order = await Orders.get(req.params.id)
  if (!order) return next()
  res.json(order)
}

async function editOrder(req, res) {
  res.json(await Orders.edit(req.params.id, req.body))
}

async function deleteOrder(req, res) {
  res.json(await Orders.destroy(req.params.id))
}

module.exports = require("./lib/auto-catch")({
  handleRoot,
  listProducts, getProduct, createProduct, editProduct, deleteProduct,
  listOrders, getOrder, createOrder, editOrder, deleteOrder
})
