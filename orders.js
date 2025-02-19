const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: 'Product', index: true, required: true }],
  status: { type: String, index: true, default: 'CREATED', enum: ['CREATED', 'PENDING', 'COMPLETED'] }
});

/**
 * List orders
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;
  const query = { ...(productId ? { products: productId } : {}), ...(status ? { status } : {}) };
  return await Order.find(query).populate('products').sort({ _id: 1 }).skip(offset).limit(limit);
}

/**
 * Get an order
 */
async function get(_id) {
  return await Order.findById(_id).populate('products').exec();
}

/**
 * Create an order
 */
async function create(fields) {
  return await new Order(fields).save();
}

/**
 * Edit an order
 */
async function edit(_id, change) {
  return await Order.findByIdAndUpdate(_id, change, { new: true });
}

/**
 * Delete an order
 */
async function destroy(_id) {
  return await Order.deleteOne({ _id });
}

module.exports = { list, get, create, edit, destroy };
