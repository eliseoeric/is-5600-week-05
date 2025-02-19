
const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

const Orders = require('./orders')
/**
 * Handle the root route
 * @param {object} req
@@ -49,9 +49,9 @@ async function getProduct(req, res, next) {
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
async function createProduct (req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
@@ -60,9 +60,10 @@ async function createProduct(req, res) {
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
@@ -71,8 +72,38 @@ async function editProduct(req, res, next) {
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}

async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}

async function editOrder(req, res, next) {
  const change = req.body;
  const order = await Orders.edit(req.params.id, change);
  res.json(order);
}

async function deleteOrder(req, res, next) {
  await Orders.destroy(req.params.id);
  res.json({ message: "Order deleted successfully" });
}

module.exports = autoCatch({
@@ -81,5 +112,9 @@ module.exports = autoCatch({
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
  deleteProduct,
  createOrder,
  listOrders,
  editOrder,
  deleteOrder
});