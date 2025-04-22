const path = require('path');
const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products with optional pagination and filtering by tag
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    const products = await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products: ' + err.message });
  }
}

/**
 * Get a single product by ID
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getProduct(req, res, next) {
  const { id } = req.params;

  try {
    const product = await Products.get(id);
    if (!product) {
      return next();  // If no product found, proceed to the next middleware (404)
    }
    res.json(product);
  } catch (err) {
    next(err);  // Pass error to error handling middleware
  }
}

/**
 * Create a new product
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  const { description, likes, urls, links, user, tags } = req.body;

  try {
    const newProduct = await Products.create({
      description,
      likes,
      urls,
      links,
      user,
      tags
    });
    res.status(201).json(newProduct);  // Respond with the newly created product
  } catch (err) {
    res.status(400).json({ message: 'Error creating product: ' + err.message });
  }
}

/**
 * Edit an existing product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  const { id } = req.params;
  const { description, likes, urls, links, user, tags } = req.body;

  try {
    const updatedProduct = await Products.edit(id, {
      description,
      likes,
      urls,
      links,
      user,
      tags
    });
    if (!updatedProduct) return next();  // If no product is updated, proceed to next middleware
    res.json(updatedProduct);
  } catch (err) {
    next(err);  // Pass error to error handling middleware
  }
}

/**
 * Delete a product by ID
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
async function deleteProduct(req, res, next) {
  const { id } = req.params;

  try {
    const deleted = await Products.remove(id);
    if (!deleted) return next();  // If no product is deleted, proceed to next middleware (404)
    res.status(204).send();  // No content to return
  } catch (err) {
    next(err);  // Pass error to error handling middleware
  }
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
});
