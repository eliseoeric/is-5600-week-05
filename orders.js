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

// LIST Orders
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options

  const query = {
    ...(productId && { products: productId }),
    ...(status && { status })
  }

  return Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
}

// GET Order by ID
async function get(_id) {
  return Order.findById(_id)
    .populate('products')
    .exec()
}

// CREATE Order
async function create(fields) {
  const order = await new Order(fields).save()
  await order.populate('products')
  return order
}

// EDIT Order
async function edit(_id, change) {
  const order = await get(_id)
  Object.keys(change).forEach(key => order[key] = change[key])
  await order.save()
  return order
}

// DELETE Order
async function destroy(_id) {
  return Order.deleteOne({ _id })
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
