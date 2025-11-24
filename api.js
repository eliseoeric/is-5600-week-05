const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

function handleRoot(req, res) {
  res.json({ message: "Welcome to Fullstack Prints API!" });
}


/* PRODUCTS */
async function listProducts(req, res) {
  res.json(await Products.list(req.query));
}

async function getProduct(req, res) {
  const product = await Products.get(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

async function createProduct(req, res) {
  if (!req.body) return res.status(400).json({ error: "No body provided" });
  res.json(await Products.create(req.body));
}

async function editProduct(req, res) {
  const updated = await Products.edit(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.json(updated);
}

async function deleteProduct(req, res) {
  res.json(await Products.destroy(req.params.id));
}

/* ORDERS */
async function listOrders(req, res) {
  res.json(await Orders.list(req.query));
}

async function getOrder(req, res) {
  const order = await Orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
}

async function createOrder(req, res) {
  res.json(await Orders.create(req.body));
}

async function editOrder(req, res) {
  const updated = await Orders.edit(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Order not found" });
  res.json(updated);
}

async function deleteOrder(req, res) {
  res.json(await Orders.destroy(req.params.id));
}

module.exports = autoCatch({
  handleRoot,
  listProducts, getProduct, createProduct, editProduct, deleteProduct,
  listOrders, getOrder, createOrder, editOrder, deleteOrder
});
