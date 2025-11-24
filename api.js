// api.js

const Products = require('./products')
const Orders = require('./orders')

/* =========================================
   ROOT
========================================= */

async function handleRoot(req, res, next) {
  res.json({ message: "Welcome to the API!" })
}

/* =========================================
   PRODUCTS API
========================================= */

/**
 * Create a new product
 */
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * List products
 */
async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(products)
}

/**
 * Get a product by ID
 */
async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  res.json(product)
}

/**
 * Edit a product
 */
async function editProduct(req, res, next) {
  const updated = await Products.edit(req.params.id, req.body)
  res.json(updated)
}

/**
 * Delete a product
 */
async function deleteProduct(req, res, next) {
  const result = await Products.destroy(req.params.id)
  res.json(result)
}


/* =========================================
   ORDERS API
========================================= */

/**
 * Create an order
 */
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * List orders
 */
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

/**
 * Edit an order
 */
async function editOrder(req, res, next) {
  const updated = await Orders.edit(req.params.id, req.body)
  res.json(updated)
}

/**
 * Delete an order
 */
async function deleteOrder(req, res, next) {
  await Orders.destroy(req.params.id)
  res.json({ status: "ok" })
}


/* =========================================
   EXPORTS
========================================= */

module.exports = {
  // root
  handleRoot,

  // products
  createProduct,
  listProducts,
  getProduct,
  editProduct,
  deleteProduct,

  // orders
  createOrder,
  listOrders,
  editOrder,
  deleteOrder
}
