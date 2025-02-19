const fs = require('fs').promises;
const path = require('path');
const cuid = require('cuid');
const db = require('./db');

const productsFile = path.join(__dirname, 'data/full-products.json');

// Define Product Model
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
});

/**
 * Create a new product
 * @param {object} fields 
 * @returns {Promise<object>}
 */
async function create(fields) {
  const product = await new Product(fields).save();
  return product;
}

/**
 * List products
 * @param {object} options 
 * @returns {Promise<Array<object>>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;

  const data = await fs.readFile(productsFile);
  const products = JSON.parse(data);

  const filteredProducts = products.filter(product => {
    if (!tag) return true;
    return product.tags.some(({ title }) => title === tag);
  });

  return filteredProducts.slice(offset, offset + limit);
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));

  return products.find(product => product.id === id) || null;
}

/**
 * Edit a product
 * @param {string} _id
 * @param {object} change
 * @returns {Promise<object>}
 */
async function edit(_id, change) {
  const product = await Product.findById(_id);
  if (!product) return null;

  Object.keys(change).forEach(key => {
    product[key] = change[key];
  });

  await product.save();
  return product;
}

/**
 * Delete a product
 * @param {string} _id
 * @returns {Promise}
 */
async function destroy(_id) {
  return await Product.deleteOne({ _id });
}

module.exports = {
  create,
  list,
  get,
  edit,
  destroy
};
