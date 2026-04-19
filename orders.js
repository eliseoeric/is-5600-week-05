const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' }
}, { timestamps: true });

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

/**
 * List orders
 * @param {*} options
 * @returns
 */
async function list(options = {}) {
  const { offset = 0, limit = 25 } = options;
  return await Order.find().populate('products').skip(offset).limit(limit);
}

/**
 * Get a single order
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  return await Order.findById(id).populate('products');
}

/**
 * Create an order
 * @param {object} orderData
 * @returns {Promise<object>}
 */
async function create(orderData) {
  const order = new Order(orderData);
  return await order.save();
}

/**
 * Edit an order
 * @param {string} id
 * @param {object} updateData
 * @returns {Promise<object>}
 */
async function edit(id, updateData) {
  return await Order.findByIdAndUpdate(id, updateData, { new: true }).populate('products');
}

/**
 * Delete an order
 * @param {string} id
 * @returns {Promise<object>}
 */
async function remove(id) {
  return await Order.findByIdAndDelete(id);
}

module.exports = {
  list,
  get,
  create,
  edit,
  remove
};