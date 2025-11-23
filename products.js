const cuid = require('cuid')
const db = require('./db')

// Define Product Schema
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
  tags: [
    {
      title: { type: String, required: true },
    }
  ],
})

/**
 * List products with filters + pagination
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  // MongoDB filter by tag (if provided)
  const query = tag
    ? { tags: { $elemMatch: { title: tag } } }
    : {}

  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(Number(offset))
    .limit(Number(limit))

  return products
}

/**
 * Get a single product by _id
 */
async function get(_id) {
  return await Product.findById(_id)
}

/**
 * Create a new product
 */
async function create(fields) {
  const product = new Product(fields)
  await product.save()
  return product
}

/**
 * Edit a product
 */
async function edit(_id, change) {
  const updated = await Product.findByIdAndUpdate(
    _id,
    change,
    { new: true } // return updated doc
  )

  return updated
}

/**
 * Delete a product
 */
async function destroy(_id) {
  return await Product.deleteOne({ _id })
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
