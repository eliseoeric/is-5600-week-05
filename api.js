const path     = require('path');
const Products = require('./products');
const Orders   = require('./orders');
const autoCatch= require('./lib/auto-catch');

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(
    await Products.list({
      offset: Number(offset),
      limit:  Number(limit),
      tag,
    })
  );
}

async function getProduct(req, res) {
  const prod = await Products.get(req.params.id);
  if (!prod) return res.status(404).json({ error: 'Not found' });
  res.json(prod);
}

async function createProduct(req, res) {
  const prod = await Products.create(req.body);
  res.status(201).json(prod);
}

async function editProduct(req, res) {
  const prod = await Products.edit(req.params.id, req.body);
  res.json(prod);
}

async function deleteProduct(req, res) {
  const result = await Products.destroy(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
}

async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  res.json(
    await Orders.list({
      offset:    Number(offset),
      limit:     Number(limit),
      productId,
      status,
    })
  );
}

async function getOrder(req, res) {
  const order = await Orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
}

async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.status(201).json(order);
}

async function editOrder(req, res) {
  const order = await Orders.edit(req.params.id, req.body);
  res.json(order);
}

async function deleteOrder(req, res) {
  await Orders.destroy(req.params.id);
  res.status(204).send();
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
  deleteOrder,
});

