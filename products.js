const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')
const Product = require('./models/Product');

/**
 * List products
 * @param {*} options 
 * @returns 
 * @returns {Promise<Array>}
 */
async function list(options = {}) {

  const { offset = 0, limit = 25, tag } = options;

  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
    .filter(product => {
      if (!tag) {
        return product
      }
  const query = tag ? { tags: tag } : {};

  const products = await Product.find(query)
    .skip(offset)
    .limit(limit)
    .exec();

      return product.tags.find(({ title }) => title == tag)
    })
    .slice(offset, offset + limit) // Slice the products
  return products;
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 * @returns {Promise<object|null>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile))

  // Loop through the products and return the product with the matching id
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }

  // If no product is found, return null
  return null;
  return await Product.findById(id);
}

module.exports = {
  list,
  get
}
};