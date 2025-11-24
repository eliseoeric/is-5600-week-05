const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  });

  res.json(products);
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);

  if (!product) return next();
  res.json(product);
}

async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.json(product);
}

async function editProduct(req, res) {
  const product = await Products.edit(req.params.id, req.body);
  res.json(product);
}

async function deleteProduct(req, res) {
  const result = await Products.destroy(req.params.id);
  res.json(result);
}

async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status
  });

  res.json(order);
}

async function editOrder(req, res) {
  const updated = await Orders.edit(req.params.id, req.body);
  res.json(updated);
}

async function deleteOrder(req, res) {
  await Orders.destroy(req.params.id);
  res.json({ deleted: true });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});
