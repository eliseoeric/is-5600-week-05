const cuid = require('cuid');
const db   = require('./db');

const Order = db.model('Order', new db.Schema({
  _id:        { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: 'Product', index: true, required: true }],
  status:     { type: String, index: true, default: 'CREATED', enum: ['CREATED','PENDING','COMPLETED'] },
}), { collection: 'orders' });

async function list({ offset = 0, limit = 25, productId, status } = {}) {
  const productQuery = productId ? { products: productId } : {};
  const statusQuery  = status    ? { status }          : {};
  const query = { ...productQuery, ...statusQuery };
  return await Order.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);
}

async function get(_id) {
  return await Order.findById(_id)
    .populate('products')
    .exec();
}

async function create(fields) {
  const order = await new Order(fields).save();
  return await order.populate('products');
}

async function edit(_id, changes) {
  const order = await get(_id);
  Object.assign(order, changes);
  await order.save();
  return await order.populate('products');
}

async function destroy(_id) {
  await Order.deleteOne({ _id });
  return { success: true };
}

module.exports = { list, get, create, edit, destroy };

