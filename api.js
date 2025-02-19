const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
@@ -10,7 +9,6 @@ const autoCatch = require('./lib/auto-catch')
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
@@ -26,24 +24,19 @@ async function listProducts(req, res) {
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
@@ -53,7 +46,6 @@ async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

/**
 * Edit a product
 * @param {object} req
@@ -64,7 +56,6 @@ async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
}

/**
 * Delete a product
 * @param {*} req 
@@ -74,7 +65,6 @@ async function editProduct(req, res, next) {
async function deleteProduct(req, res, next) {
  res.json({ success: true })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
@@ -83,3 +73,32 @@ module.exports = autoCatch({
  editProduct,
  deleteProduct
});
/**
 * Create an order
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(orders)
}

/**
 * List orders
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
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