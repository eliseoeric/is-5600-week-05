const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
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
}


/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }

  return res.json(product)
}

/**
 * Create a product
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.json(product);
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.edit(id, req.body);
  if (!product) {
    return next();
  }
  res.json(product);
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.remove(id);
  if (!product) {
    return next();
  }
  res.json({ success: true });
}

/**
 * List all orders
 * @param {object} req
 * @param {object} res
 */
async function listOrders(req, res) {
  const { offset = 0, limit = 25 } = req.query;
  res.json(await Orders.list({
    offset: Number(offset),
    limit: Number(limit)
  }));
}

/**
 * Get a single order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getOrder(req, res, next) {
  const { id } = req.params;
  const order = await Orders.get(id);
  if (!order) {
    return next();
  }
  res.json(order);
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
 * Edit an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editOrder(req, res, next) {
  const { id } = req.params;
  const order = await Orders.edit(id, req.body);
  if (!order) {
    return next();
  }
  res.json(order);
}

/**
 * Delete an order
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function deleteOrder(req, res, next) {
  const { id } = req.params;
  const order = await Orders.remove(id);
  if (!order) {
    return next();
  }
  res.json({ success: true });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  getOrder,
  createOrder,
  editOrder,
  deleteOrder
});
