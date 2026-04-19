const cuid = require('cuid')
const db = require('./db')

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

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  const query = {}

  if (tag) {
    query['tags.title'] = tag
  }

  const products = await Product.find(query)
    .skip(offset)
    .limit(limit)

  return products
}

async function get(id) {
  const product = await Product.findById(id)
  return product
}

async function create(fields) {
  const product = await new Product(fields).save()
  return product
}

module.exports = {
  list,
  get,
  create
}