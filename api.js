const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
}


/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }

  return res.json(product)
}

/**
 * Create a product
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
});
// api.js
const Products = require('./products')
const Orders = require('./orders')

/**
 * Create a new product
 */
async function createProduct (req, res, next) {
  try {
    const product = await Products.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * List products
 */
async function listProducts (req, res, next) {
  try {
    const { offset = 0, limit = 25, tag } = req.query
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
 * Get a product
 */
async function getProduct (req, res, next) {
  try {
    const product = await Products.get(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * Update product
 */
async function editProduct (req, res, next) {
  try {
    const change = req.body
    const product = await Products.edit(req.params.id, change)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

/**
 * Delete product
 */
async function deleteProduct (req, res, next) {
  try {
    await Products.destroy(req.params.id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

/* ---------------- Orders handlers ------------------ */

/**
 * Create an order
 */
async function createOrder (req, res, next) {
  try {
    const order = await Orders.create(req.body)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

/**
 * List orders
 */
async function listOrders (req, res, next) {
  try {
    const { offset = 0, limit = 25, productId, status } = req.query
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
 * Update an order
 */
async function editOrder (req, res, next) {
  try {
    const change = req.body
    const order = await Orders.edit(req.params.id, change)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

/**
 * Delete an order
 */
async function deleteOrder (req, res, next) {
  try {
    await Orders.destroy(req.params.id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  // product handlers
  createProduct,
  listProducts,
  getProduct,
  editProduct,
  deleteProduct,
  // order handlers
  createOrder,
  listOrders,
  editOrder,
  deleteOrder
}

