
const cuid = require('cuid')
const db = require('./db')

// Define Order Model
const Order = db.model('Order', {
  _id: { type: String, default: cuid },

  buyerEmail: {
    type: String,
    required: true
  },

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

// List Orders
async function list(options = {}) {
  const {
    offset = 0,
    limit = 25,
    productId,
    status
  } = options

  const query = {
    ...(productId ? { products: productId } : {}),
    ...(status ? { status } : {})
  }

  const orders = await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return orders
}

// Get Single Order
async function get(_id) {
  const order = await Order.findById(_id)
    .populate('products')
    .exec()

  return order
}

// Create Order
async function create(fields) {
  const order = await new Order(fields).save()
  await order.populate('products')
  return order
}

// Update Order
async function edit(_id, change) {
  const order = await Order.findById(_id)

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

// Delete Order
async function destroy(_id) {
  await Order.deleteOne({ _id })
}

// Export Functions
module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
