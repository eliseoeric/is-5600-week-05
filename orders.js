const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: 'Product', required: true, index: true }],
  status: { type: String, enum: ['CREATED', 'PENDING', 'COMPLETED'], default: 'CREATED', index: true }
});

async function list({ offset = 0, limit = 25, productId, status } = {}) {
  const query = { ...(productId && { products: productId }), ...(status && { status }) };
  return await Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

async function get(_id) {
  return await Order.findById(_id).populate('products').exec();
}

async function create(fields) {
  const order = new Order(fields);
  await order.save();
  return order.populate('products');
}

async function edit(_id, changes) {
  return await Order.findByIdAndUpdate(_id, changes, { new: true });
}

async function destroy(_id) {
  const order = await Order.findByIdAndDelete(_id);
  if (!order) throw new Error("Order not found");
}

module.exports = { create, get, list, edit, destroy };