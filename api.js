const path = require('path')
const Products = require('./products')
const fs = require('fs').promises

const productsFile = path.join(__dirname, 'data/full-products.json')

const autoCatch = require('./lib/auto-catch')

/**
 * Root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

/**
 * LIST products
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
 * GET single product
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)

  if (!product) return next()

  res.json(product)
}

/**
 * CREATE product (FIXED)
 */
async function createProduct(req, res) {
  const products = JSON.parse(await fs.readFile(productsFile))

  const newProduct = {
    id: Date.now().toString(), // simple unique id
    ...req.body
  }

  products.push(newProduct)

  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))

  res.status(201).json(newProduct)
}

/**
 * UPDATE product (FIXED)
 */
async function editProduct(req, res, next) {
  const { id } = req.params

  const products = JSON.parse(await fs.readFile(productsFile))

  const index = products.findIndex(p => p.id === id)

  if (index === -1) return next()

  products[index] = {
    ...products[index],
    ...req.body
  }

  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))

  res.json(products[index])
}

/**
 * DELETE product (FIXED)
 */
async function deleteProduct(req, res, next) {
  const { id } = req.params

  const products = JSON.parse(await fs.readFile(productsFile))

  const newProducts = products.filter(p => p.id !== id)

  if (newProducts.length === products.length) return next()

  await fs.writeFile(productsFile, JSON.stringify(newProducts, null, 2))

  res.json({ success: true, id })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
})