

const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
@@ -18,16 +19,18 @@ function handleRoot(req, res) {
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  
  //const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  
  }));
}
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id);
  if (!product) {
    
    return next();
  }

  return res.json(product);
}

async function createProduct(req, res, next) {
  try {
    // Actually insert into MongoDB
    const product = await Products.create(req.body);
    res.json(product);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(400).json({ error: err.message });
  }
}
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
   const change = req.body;
  const product = await Products.edit(req.params.id, change);
  res.json(product);
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * * @param {object} req
 * @param {object} res
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
  const productId = req.params.id;
  try {
    const response = await Products.destroy(productId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the product' });
  }
}

/**
 * Create an order
 * @param {object} req
 * @param {object} res
 */
async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.json(order);
}

/**
 * List orders
 * @param {object} req
 * @param {object} res
 */
async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  });
  res.json(orders);
}

/**
 * Edit an order
 * @param {object} req
 * @param {object} res
 */
async function editOrder(req, res, next) {
  const { id } = req.params;
  const change = req.body;
  const order = await Orders.edit(id, change);
  res.json(order);
}

/**
 * Delete an order
 * @param {object} req
 * @param {object} res
 */
async function deleteOrder(req, res, next) {
  const { id } = req.params;
  try {
    const response = await Orders.destroy(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the order' });
  }
}

module.exports = autoCatch({

  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});


