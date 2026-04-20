const Products = require('./products')
const Orders = require('./orders')

/**
 * List products
 */
async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query
  try {
    const products = await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
}

/**
 * Get a single product
 */
async function getProduct(req, res, next) {
  try {
    const product = await Products.get(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * Create a new product
 */
async function createProduct(req, res, next) {
  try {
    const product = await Products.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * Update a product
 */
async function editProduct(req, res, next) {
  try {
    const change = req.body
    const product = await Products.edit(req.params.id, change)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * Delete a product
 */
async function deleteProduct(req, res, next) {
  try {
    const response = await Products.destroy(req.params.id)
    res.json(response)
  } catch (err) {
    next(err)
  }
}

/**
 * List orders
 */
async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query
  try {
    const orders = await Orders.list({
      offset: Number(offset),
      limit: Number(limit),
      productId,
      status
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

/**
 * Get a single order
 */
async function getOrder(req, res, next) {
  try {
    const order = await Orders.get(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    next(err)
  }
}

/**
 * Create an order
 */
async function createOrder(req, res, next) {
  try {
    const order = await Orders.create(req.body)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

/**
 * Update an order  ← INDEPENDENT TASK
 */
async function editOrder(req, res, next) {
  try {
    const change = req.body
    const order = await Orders.edit(req.params.id, change)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

/**
 * Delete an order  ← INDEPENDENT TASK
 */
async function deleteOrder(req, res, next) {
  try {
    const response = await Orders.destroy(req.params.id)
    res.json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  getOrder,
  createOrder,
  editOrder,
  deleteOrder
}