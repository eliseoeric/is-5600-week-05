const Order = require('./models/Order');
const Product = require('./models/Product');

/**
 * List orders
 * @returns {Promise<Array>}
 */
async function list() {
  return await Order.find().sort({ createdAt: -1 }).exec();
}

/**
 * Create a new order
 * @param {Array<string>} productIds 
 * @returns {Promise<object>}
 */
async function create(productIds = []) {
  // Fetch the products from DB
  const products = await Product.find({ _id: { $in: productIds } });

  // Calculate total price
  const total = products.reduce((sum, product) => sum + product.price, 0);

  // Create and save the order
  const order = new Order({
    products: products.map(p => p._id),
    total,
    createdAt: new Date()
  });

  return await order.save();
}

module.exports = {
  list,
  create
};