const Product = require('./models/product');  // Assuming a Product model is defined in models/product.js

/**
 * List products
 * @param {*} options 
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;

  try {
    const query = tag ? { tags: { title: tag } } : {};  // Filter by tag if provided
    const products = await Product.find(query)
      .skip(offset)
      .limit(limit);

    return products;
  } catch (error) {
    throw new Error('Error fetching products from database');
  }
}

/**
 * Get a single product by its ID
 * @param {string} id
 * @returns {Promise<object|null>}
 */
async function get(id) {
  try {
    const product = await Product.findById(id);
    return product || null;  // Return null if no product is found
  } catch (error) {
    throw new Error('Error fetching product from database');
  }
}

/**
 * Create a new product
 * @param {object} productData
 * @returns {Promise<object>}
 */
async function create(productData) {
  try {
    const product = new Product(productData);
    return await product.save();  // Save the product to the database
  } catch (error) {
    throw new Error('Error creating product');
  }
}

/**
 * Edit an existing product by ID
 * @param {string} id
 * @param {object} productData
 * @returns {Promise<object|null>}
 */
async function edit(id, productData) {
  try {
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });  // Return the updated product
    return product || null;
  } catch (error) {
    throw new Error('Error updating product');
  }
}

/**
 * Delete a product by ID
 * @param {string} id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
  try {
    const result = await Product.findByIdAndDelete(id);  // Delete product by ID
    return result != null;  // Return true if deleted, false otherwise
  } catch (error) {
    throw new Error('Error deleting product');
  }
}

module.exports = {
  list,
  get,
  create,
  edit,
  remove
};
