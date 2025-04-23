const cuid = require('cuid');
const db = require('./db');

// Define the Order model
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
});

/**
 * List orders with optional filtering by productId or status
 * @param {Object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;

  const productQuery = productId ? { products: productId } : {};
  const statusQuery = status ? { status } : {};

  const query = {
    ...productQuery,
    ...statusQuery
  };

  const orders = await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return orders;
}

/**
 * Get a specific order by ID
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function get(_id) {
  const order = await Order.findById(_id)
    .populate('products') // auto-resolves product refs
    .exec();

  return order;
}

/**
 * Create a new order
 * @param {Object} fields
 * @returns {Promise<Object>}
 */
async function create(fields) {
  const order = await new Order(fields).save();
  await order.populate('products');
  return order;
}

/**
 * Edit an order
 * @param {String} _id
 * @param {Object} changes
 * @returns {Promise<Object>}
 */
async function edit(_id, changes) {
  const updatedOrder = await Order.findByIdAndUpdate(_id, changes, {
    new: true
  })
    .populate('products')
    .exec();

  return updatedOrder;
}

/**
 * Delete an order
 * @param {String} _id
 * @returns {Promise<void>}
 */
async function destroy(_id) {
  await Order.findByIdAndDelete(_id);
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
};