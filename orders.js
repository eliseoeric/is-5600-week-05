// orders.js
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

// ---------- CRUD Methods ----------

// List Orders
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options
  const productQuery = productId ? { products: productId } : {}
  const statusQuery = status ? { status } : {}

  const query = { ...productQuery, ...statusQuery }

  const orders = await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return orders
}

// Get Order by ID (with products populated)
async function get(_id) {
  return await Order.findById(_id).populate('products').exec()
}

// Create Order
async function create(fields) {
  const order = await new Order(fields).save()
  await order.populate('products')
  return order
}

// Edit Order
async function edit(_id, change) {
  const order = await get(_id)
  Object.keys(change).forEach(key => {
    order[key] = change[key]
  })
  await order.save()
  return order
}

// Delete Order
async function destroy(_id) {
  return await Order.deleteOne({ _id })
}

// Exports
module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
