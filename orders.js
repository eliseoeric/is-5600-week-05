const cuid = require('cuid');
const db = require('./db');
const Product = require('./products');  // Import Product model for reference

// Define Order Schema
const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product', // MongoDB reference to Product model
    required: true,
  }],
  status: {
    type: String,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED'],
  },
});

// List all orders with filtering options
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;
  const productQuery = productId ? { products: productId } : {};
  const statusQuery = status ? { status } : {};

  const orders = await Order.find({ ...productQuery, ...statusQuery })
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return orders;
}

// Get a single order by ID with populated product data
async function get(_id) {
  const order = await Order.findById(_id).populate('products').exec();
  return order;
}

// Create a new order
async function create(fields) {
  const order = await new Order(fields).save();
  await order.populate('products');
  return order;
}

// Edit an existing order
async function edit(_id, change) {
  const order = await get(_id);

  Object.keys(change).forEach((key) => {
    order[key] = change[key];
  });

  await order.save();
  return order;
}

// Delete an order
async function destroy(_id) {
  return await Order.deleteOne({ _id });
}

module.exports = { list, get, create, edit, destroy };
