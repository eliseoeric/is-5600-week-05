const mongoose = require('mongoose')
const cuid = require('cuid')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://sathvikguntuka_db_user:RkVLGIj81AC3iPR6@cluster0.bfqe8lc.mongodb.net/productsDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const Product = mongoose.model('Product', {
  _id: { type: String, default: cuid },
  description: String,
  alt_description: String,
  likes: Number,
  urls: {
    regular: String,
    small: String,
    thumb: String
  },
  links: {
    self: String,
    html: String
  },
  user: {
    id: String,
    first_name: String,
    last_name: String,
    portfolio_url: String,
    username: String
  },
  tags: [
    {
      title: String
    }
  ]
})

/**
 * List products
 * @param {object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  const query = tag
    ? {
        tags: {
          $elemMatch: { title: tag }
        }
      }
    : {}

  const products = await Product.find(query)
    .skip(offset)
    .limit(limit)

  return products
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  return await Product.findById(id)
}

/**
 * Create a product
 * @param {object} fields
 * @returns {Promise<object>}
 */
async function create(fields) {
  const product = await new Product(fields).save()
  return product
}

/**
 * Edit a product
 * @param {string} id
 * @param {object} change
 * @returns {Promise<object|null>}
 */
async function edit(id, change) {
  const product = await Product.findById(id)

  if (!product) {
    return null
  }

  Object.keys(change).forEach((key) => {
    product[key] = change[key]
  })

  await product.save()
  return product
}

/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function destroy(id) {
  return await Product.deleteOne({ _id: id })
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}