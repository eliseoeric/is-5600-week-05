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
  const { offset = 0, limit = 25, tag } = req.query
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })
  res.json(products)
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
  const created = await Products.create(req.body)
  res.status(201).json(created)
}

/**
 * Edit a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function editProduct(req, res, next) {
  const { id } = req.params
  const updated = await Products.update(id, req.body)

  if (!updated) {
    return next()
  }

  res.json(updated)
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  const { id } = req.params
  const removed = await Products.remove(id)

  if (!removed) {
    return next()
  }

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
