const path = require('path')
// api.js
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')
const Orders = require('./orders')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
 * Create a new product
 */
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 * List products with optional filters
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
async function listProducts(req, res, next) {
  const { offset, limit, tag } = req.query
  const products = await Products.list({
    offset: Number(offset) || 0,
    limit: Number(limit) || 25,
    tag
  }))
  })
  res.json(products)
}


/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 * Get single product by id
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }
  const product = await Products.get(req.params.id)
  res.json(product)
}

  return res.json(product)
/**
 * Edit a product
 */
async function editProduct(req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
 * Create a product
 * @param {object} req 
 * @param {object} res 
 * Delete a product
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * Create an order
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * List orders
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
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

module.exports = autoCatch({
  handleRoot,
module.exports = {
  createProduct,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
});
  deleteProduct,
  createOrder,
  listOrders,
}