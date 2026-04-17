const path = require('path')
const Product = require('./products')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  const query = tag ? { tags: tag } : {}

  const products = await Product.find(query)
    .skip(Number(offset))
    .limit(Number(limit))

  res.json(products)
}

async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Product.findById(id)
  if (!product) return next()

  res.json(product)
}

async function createProduct(req, res) {
  const product = new Product(req.body)
  const saved = await product.save()
  res.status(201).json(saved)
}

async function editProduct(req, res, next) {
  const { id } = req.params

  const updated = await Product.findByIdAndUpdate(id, req.body, {
    new: true
  })

  if (!updated) return next()

  res.json(updated)
}

async function deleteProduct(req, res, next) {
  const { id } = req.params

  const deleted = await Product.findByIdAndDelete(id)
  if (!deleted) return next()

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