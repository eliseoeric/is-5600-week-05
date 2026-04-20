const cuid = require('cuid')
const db = require('./db')

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
 * List orders
 * @param {Object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options

  const productQuery = productId ? { products: productId } : {}
  const statusQuery = status ? { status } : {}

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
 * Get one order
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
 * Create order
 * @param {Object} fields
 * @returns {Promise<Object>}
 */
async function create(fields) {
  const order = await new Order(fields).save()
  await order.populate('products')
  return order
}

/**
 * Edit order
 * @param {String} _id
 * @param {Object} change
 * @returns {Promise<Object>}
 */
async function edit(_id, change) {
  const order = await get(_id)

  if (!order) {
    return null
  }

  Object.keys(change).forEach(function (key) {
    order[key] = change[key]
  })

  await order.save()
  await order.populate('products')
  return order
}

/**
 * Delete order
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function destroy(_id) {
  return await Order.deleteOne({ _id })
}

module.exports = {
  create,
  list,
  get,
  edit,
  destroy
}