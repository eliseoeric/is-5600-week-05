const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 */
function handleRoot(req, res) {
  res.json({ message: "Welcome to Fullstack Prints API!" });
}

/**
 * CRUD for Products
 */
async function listProducts(req, res) { res.json(await Products.list(req.query)); }
async function getProduct(req, res) { res.json(await Products.get(req.params.id)); }
async function createProduct(req, res) { res.json(await Products.create(req.body)); }
async function editProduct(req, res) { res.json(await Products.edit(req.params.id, req.body)); }
async function deleteProduct(req, res) { res.json(await Products.destroy(req.params.id)); }

/**
 * CRUD for Orders
 */
async function listOrders(req, res) { res.json(await Orders.list(req.query)); }
async function getOrder(req, res) { res.json(await Orders.get(req.params.id)); }
async function createOrder(req, res) { res.json(await Orders.create(req.body)); }
async function editOrder(req, res) { res.json(await Orders.edit(req.params.id, req.body)); }
async function deleteOrder(req, res) { res.json(await Orders.destroy(req.params.id)); }

module.exports = autoCatch({
  handleRoot,
  listProducts, getProduct, createProduct, editProduct, deleteProduct,
  listOrders, getOrder, createOrder, editOrder, deleteOrder
});
