const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
async function listProducts(req, res, next) {
  try {
    const { offset = 0, limit = 25, tag } = req.query;
    const products = await Products.list({ offset: Number(offset), limit: Number(limit), tag });
    res.json(products);
  } catch (error) {
    next(error);
  }
}
async function getProduct(req, res, next) {
  try {
    const product = await Products.get(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params
async function editProduct(req, res, next) {
  try {
    const updatedProduct = await Products.edit(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

  const product = await Products.get(id)
  if (!product) {
    return next()
async function deleteProduct(req, res, next) {
  try {
    await Products.destroy(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

  return res.json(product)
async function createOrder(req, res, next) {
  try {
    const order = await Orders.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

/**
 * Create a product
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
async function listOrders(req, res, next) {
  try {
    const { offset = 0, limit = 25, productId, status } = req.query;
    const orders = await Orders.list({ offset: Number(offset), limit: Number(limit), productId, status });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
async function editOrder(req, res, next) {
  try {
    const updatedOrder = await Orders.edit(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = autoCatch({
@@ -81,5 +95,9 @@ module.exports = autoCatch({
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});