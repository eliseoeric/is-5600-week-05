const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

function badRequest (message) {
  return Object.assign(new Error(message), { status: 400 })
}
function pagination (query) {
  const result = {}
  for (const [key, fallback] of [['offset', 0], ['limit', 25]]) {
    const value = query[key] === undefined ? String(fallback) : query[key]
    if (typeof value !== 'string' || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
      throw badRequest(`${key} must be a nonnegative integer`)
    }
    result[key] = Number(value)
  }
  return result
}
function filter (query, key) {
  if (query[key] !== undefined && typeof query[key] !== 'string') {
    throw badRequest(`${key} must be a string`)
  }
  return query[key]
}
function body (req, editing = false) {
  const value = req.body
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw badRequest('A JSON object is required')
  }
  if (Object.keys(value).some(key => key.startsWith('$') || key.includes('.') ||
    key === '__v' || (editing && key === '_id'))) {
    throw badRequest('Invalid or read-only field')
  }
  return value
}
async function listProducts (req, res) {
  res.json(await Products.list({ ...pagination(req.query), tag: filter(req.query, 'tag') }))
}
async function getProduct (req, res, next) {
  const product = await Products.get(req.params.id)
  if (!product) return next()
  res.json(product)
}
async function createProduct (req, res) {
  res.status(201).json(await Products.create(body(req)))
}
async function editProduct (req, res, next) {
  const product = await Products.edit(req.params.id, body(req, true))
  if (!product) return next()
  res.json(product)
}
async function deleteProduct (req, res, next) {
  const result = await Products.destroy(req.params.id)
  if (!result.deletedCount) return next()
  res.json(result)
}
async function listOrders (req, res) {
  res.json(await Orders.list({ ...pagination(req.query),
    productId: filter(req.query, 'productId'), status: filter(req.query, 'status') }))
}
async function getOrder (req, res, next) {
  const order = await Orders.get(req.params.id)
  if (!order) return next()
  res.json(order)
}
async function createOrder (req, res) {
  res.status(201).json(await Orders.create(body(req)))
}
async function editOrder (req, res, next) {
  const order = await Orders.edit(req.params.id, body(req, true))
  if (!order) return next()
  res.json(order)
}
async function deleteOrder (req, res, next) {
  if (!await Orders.get(req.params.id)) return next()
  await Orders.destroy(req.params.id)
  res.status(204).end()
}
module.exports = autoCatch({ listProducts, getProduct, createProduct, editProduct,
  deleteProduct, listOrders, getOrder, createOrder, editOrder, deleteOrder })
