// orders.js
const cuid = require('cuid')
const db = require('./db')

// Define Order Model
const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product',
    index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
})

/**
 * List orders with pagination and filtering
 * @param {Object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;

  const productQuery = productId ? {
    products: productId
  } : {}

  const statusQuery = status ? {
    status: status
  } : {}

  const query = {
    ...productQuery,
    ...statusQuery
  }

  const orders = await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return orders
}

/**
 * Get a single order by ID (with populated products)
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function get(_id) {
  const order = await Order.findById(_id)
    .populate('products')
    .exec()
  return order
}

/**
 * Create a new order
 * @param {Object} fields
 * @returns {Promise<Object>}
 */
async function create(fields) {
  const order = await new Order(fields).save()
  await order.populate('products')
  return order
}

/**
 * YOUR TASK #1: Edit/Update an order
 * @param {String} _id
 * @param {Object} change
 * @returns {Promise<Object>}
 */
async function edit(_id, change) {
  // TODO: Implement this method
  // 1. Get the existing order using get(_id)
  // 2. Update each field from the change object
  // 3. Save the order
  // 4. Return the updated order
  const order = await get(_id)
  
  // Update allowed fields (buyerEmail, products, status)
  if (change.buyerEmail) order.buyerEmail = change.buyerEmail
  if (change.products) order.products = change.products
  if (change.status) order.status = change.status
  
  await order.save()
  await order.populate('products')
  return order
}

/**
 * YOUR TASK #2: Delete an order
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function destroy(_id) {
  // TODO: Implement this method
  // Delete the order with the given _id
  // Return the result of the delete operation
  return await Order.deleteOne({ _id })
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}