const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
}

async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }

  return res.json(product)
}

async function createProduct(req, res) {
  console.log('request body:', req.body)
  const product = await Products.create(req.body)
  res.json(product)
}

async function editProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.edit(id, req.body)

  if (!product) {
    return next()
  }

  res.json(product)
}

async function deleteProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.remove(id)

  if (!product) {
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
})