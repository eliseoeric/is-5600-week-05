const fs = require('fs').promises
const path = require('path')
const Product = require('./lib/product-model')

const productsFile = path.join(__dirname, 'data/full-products.json')

/**
 * List products
 * @param {*} options 
 * @returns 
 */
async function list(options = {}) {

  const { offset = 0, limit = 25, tag } = options;

  try {
    let query = Product.find();
    
    if (tag) {
      query = query.where('tags.title').equals(tag);
    }
    
    const products = await query
      .skip(offset)
      .limit(limit)
      .exec();
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

module.exports = {
  list,
  get
}