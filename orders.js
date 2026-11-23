
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

// List orders
async function list() {
  return Order.find()
}

// Get one order
async function get(_id) {
  return Order.findById(_id)
}

// Create order
async function create(fields) {
  return new Order(fields).save()
}

// Edit order
async function edit(_id, change) {
  const order = await get(_id)

  if (!order) {
    return null
  }

  Object.keys(change).forEach(function(key) {
    order[key] = change[key]
  })

  await order.save()
  return order
}

// Delete order
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
