const Orders = require('./orders');

// Create an order
async function createOrder(req, res, next) {
  const order = await Orders.create(req.body);
  res.json(order);
}

// List all orders with optional filters
async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  const orders = await Orders.list({ offset, limit, productId, status });
  res.json(orders);
}

// Get a single order by ID
async function getOrder(req, res, next) {
  const order = await Orders.get(req.params.id);
  res.json(order);
}

// Edit an existing order
async function editOrder(req, res, next) {
  const change = req.body;
  const order = await Orders.edit(req.params.id, change);
  res.json(order);
}

// Delete an order
async function deleteOrder(req, res, next) {
  const response = await Orders.destroy(req.params.id);
  res.json(response);
}

module.exports = { createOrder, listOrders, getOrder, editOrder, deleteOrder };
