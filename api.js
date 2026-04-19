const path = require('path')

const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(products)
}

async function getProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)

  if (!product) {
    return next()
  }

  res.json(product)
}

async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

async function updateProduct(req, res, next) {
  res.status(501).json({ error: 'Not implemented' })
}

async function deleteProduct(req, res, next) {
  res.status(501).json({ error: 'Not implemented' })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
})