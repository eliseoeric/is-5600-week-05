const fs = require('fs').promises
const path = require('path')
// products.js
const cuid = require('cuid')
const db = require('./db')

const productsFile = path.join(__dirname, 'data/full-products.json')
// Define Product schema and model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [{
    title: { type: String, required: true },
  }],
})

/**
 * List products
 * @param {*} options 
 * @returns 
 * Create a product
 * @param {Object} fields
 * @returns {Promise<Object>}
 */
async function create(fields) {
  const product = await new Product(fields).save()
  return product
}

/**
 * List products with optional pagination and tag filter
 * @param {Object} options
 * @returns {Promise<Object[]>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  const { offset = 0, limit = 25, tag } = options;
  const query = tag ? {
    tags: {
      $elemMatch: { title: tag }
    }
  } : {}

  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
    .filter(product => {
      if (!tag) {
        return product
      }
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

      return product.tags.find(({ title }) => title == tag)
    })
    .slice(offset, offset + limit) // Slice the products
  return products
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 * Get product by ID
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile))
async function get(_id) {
  const product = await Product.findById(_id)
  return product
}

  // Loop through the products and return the product with the matching id
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }
/**
 * Edit a product by ID
 * @param {String} _id
 * @param {Object} change
 * @returns {Promise<Object>}
 */
async function edit(_id, change) {
  const product = await get(_id)

  Object.keys(change).forEach(key => {
    product[key] = change[key]
  })

  // If no product is found, return null
  return null;
  await product.save()
  return product
}

/**
 * Delete product by ID
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function destroy(_id) {
  return await Product.deleteOne({ _id })
}

module.exports = {
  create,
  list,
  get
}
  get,
  edit,
  destroy,
}