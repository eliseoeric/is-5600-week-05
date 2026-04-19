const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  alt_description: { type: String },
  urls: {
    regular: { type: String },
    small: { type: String },
    thumb: { type: String }
  },
  links: {
    self: { type: String },
    html: { type: String }
  },
  likes: { type: Number, default: 0 },
  user: {
    id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String }
  },
  tags: [{ title: { type: String } }]
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

/**
 * List products
 * @param {*} options
 * @returns
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;

  let query = {};
  if (tag) {
    query['tags.title'] = tag;
  }

  return await Product.find(query).skip(offset).limit(limit);
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  return await Product.findOne({ id });
}

/**
 * Create a product
 * @param {object} productData
 * @returns {Promise<object>}
 */
async function create(productData) {
  const product = new Product(productData);
  return await product.save();
}

/**
 * Edit a product
 * @param {string} id
 * @param {object} updateData
 * @returns {Promise<object>}
 */
async function edit(id, updateData) {
  return await Product.findOneAndUpdate({ id }, updateData, { new: true });
}

/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function remove(id) {
  return await Product.findOneAndDelete({ id });
}

module.exports = {
  list,
  get,
  create,
  edit,
  remove
};