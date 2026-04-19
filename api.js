const path = require('path')

const Products = require('./products')

const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

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
 * @param {function} next
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
 * Create a new product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 */
async function editProduct(req, res) {
  res.json({ ok: true, message: 'Edit product route not implemented in this lab.' })
}

/**
 * Delete a product
 * @param {object} req
 * @param {object} res
 */
async function deleteProduct(req, res) {
  res.json({ ok: true, message: 'Delete product route not implemented in this lab.' })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
})