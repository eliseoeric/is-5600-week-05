const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: 'Product', required: true }],
  status: { type: String, default: 'CREATED' }
});

async function list(options = {}) {
  const { offset = 0, limit = 25 } = options;
  return Order.find().skip(offset).limit(limit);
}

async function get(id) {
  return Order.findById(id).populate('products');
}

async function create(fields) {
  const order = await Order.create(fields);
  return Order.findById(order._id).populate('products');
}

async function edit(id, change) {
  return Order.findByIdAndUpdate(id, change, { new: true }).populate('products');
}

async function destroy(id) {
  return Order.deleteOne({ _id: id });
}

module.exports = { list, get, create, edit, destroy };
