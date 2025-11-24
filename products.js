const cuid = require('cuid')
const db = require('./db')

// Our Product Model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true }
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true }
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true }
  },
  tags: [
    {
      title: { type: String, required: true }
    }
  ]
})

/**
 * List products with optional tag filter, offset, and limit
 * @param {object} options
 */
async function list (options = {}) {
  const { offset = 0, limit = 25, tag } = options

  const query = tag
    ? {
        tags: {
          $elemMatch: {
            title: tag
          }
        }
      }
    : {}

  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(Number(offset))
    .limit(Number(limit))

  return products
}

/**
 * Get a single product by id
 * @param {string} _id
 */
async function get (_id) {
  const product = await Product.findById(_id)
  return product // will be null if not found
}

/**
 * Create a product
 * @param {object} fields
 */
async function create (fields) {
  const product = await new Product(fields).save()
  return product
}

/**
 * Edit a product
 * @param {string} _id
 * @param {object} change
 */
async function edit (_id, change) {
  const product = await get(_id)
  if (!product) {
    return null
  }

  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })

  await product.save()
  return product
}

/**
 * Delete a product
 * @param {string} _id
 */
async function destroy (_id) {
  return await Product.deleteOne({ _id })
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
