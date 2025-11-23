const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

async function listProducts(req, res) {
  res.json(await Products.list(req.query));
}

async function getProduct(req, res) {
  const product = await Products.get(req.params.id);
  if (!product) return res.status(404).send("Not found");
  res.json(product);
}

async function createProduct(req, res) {
  res.json(await Products.create(req.body));
}

async function editProduct(req, res) {
  res.json(await Products.edit(req.params.id, req.body));
}

async function deleteProduct(req, res) {
  res.json(await Products.destroy(req.params.id));
}

async function createOrder(req, res) {
  res.json(await Orders.create(req.body));
}

async function listOrders(req, res) {
  res.json(await Orders.list(req.query));
}

async function getOrder(req, res) {
  const order = await Orders.get(req.params.id);
  if (!order) return res.status(404).send("Not found");
  res.json(order);
}

async function editOrder(req, res) {
  res.json(await Orders.edit(req.params.id, req.body));
}

async function deleteOrder(req, res) {
  res.json(await Orders.destroy(req.params.id));
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
});
