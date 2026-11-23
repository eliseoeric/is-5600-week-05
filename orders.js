const db = require('./db')
const cuid = require('cuid')
require('./products')

const Order = db.model('Order', new db.Schema({
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: 'Product', index: true, required: true }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
}))

async function list ({ offset = 0, limit = 25, productId, status } = {}) {
  if (limit === 0) return []
  const query = {}
  if (productId) query.products = productId
  if (status) query.status = status
  return Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit).exec()
}
async function get (id) { return Order.findById(id).populate('products').exec() }
async function create (fields) {
  const order = await new Order(fields).save()
  return order.populate('products')
}
async function edit (id, changes) {
  const order = await Order.findById(id).exec()
  if (!order) return null
  order.set(changes)
  await order.save()
  return order.populate('products')
}
async function destroy (id) { await Order.deleteOne({ _id: id }).exec() }

module.exports = { list, get, create, edit, destroy }
