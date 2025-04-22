const Product = require('./models/Product');

/**
 * List products
 * @param {*} options 
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;

  const query = tag ? { tags: tag } : {};

  const products = await Product.find(query)
    .skip(offset)
    .limit(limit)
    .exec();

  return products;
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object|null>}
 */
async function get(id) {
  return await Product.findById(id);
}

module.exports = {
  list,
  get
};
