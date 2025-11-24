const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs').promises

// Use a very flexible schema so we can reuse the existing JSON structure
const productSchema = new mongoose.Schema({}, { strict: false })
const Product = mongoose.model('Product', productSchema)

const productsFile = path.join(__dirname, 'data/full-products.json')

/**
 * Seed the database from the JSON file if it's empty.
 */
async function ensureSeeded() {
  const count = await Product.countDocuments()
  if (count === 0) {
    const data = await fs.readFile(productsFile)
    const products = JSON.parse(data)
    await Product.insertMany(products)
  }
}

/**
 * List products
 * @param {*} options 
 * @returns 
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  await ensureSeeded()

  const query = {}
  if (tag) {
    // Match tag title inside tags array
    query['tags.title'] = tag
  }

  const products = await Product.find(query)
    .skip(Number(offset))
    .limit(Number(limit))

  return products
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  await ensureSeeded()
  const product = await Product.findOne({ id })
  return product
}

/**
 * Create a new product
 * @param {object} data
 * @returns {Promise<object>}
 */
async function create(data) {
  const product = await Product.create(data)
  return product
}

/**
 * Update an existing product
 * @param {string} id
 * @param {object} data
 * @returns {Promise<object|null>}
 */
async function update(id, data) {
  const product = await Product.findOneAndUpdate({ id }, data, { new: true })
  return product
}

/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
  const result = await Product.findOneAndDelete({ id })
  return !!result
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
}
