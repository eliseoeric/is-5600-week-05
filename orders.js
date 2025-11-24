const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [
    {
      type: String,
      ref: 'Product',
      required: true,
      index: true
    }
  ],
  status: {
    type: String,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED'],
    index: true
  }
});


async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;

  const query = {};
  if (productId) query.products = productId;
  if (status) query.status = status;

  return await Order.find(query)
    .sort({ _id: 1 })
    .skip(Number(offset))
    .limit(Number(limit))
    .exec();
}


async function get(id) {
  return await Order.findById(id).populate('products').exec();
}


async function create(fields) {
  const order = await new Order(fields).save();
  return await order.populate('products');
}


async function edit(id, changes) {
  const updated = await Order.findByIdAndUpdate(id, changes, {
    new: true
  })
    .populate('products')
    .exec();

  if (!updated) {
    throw new Error(`Order with id ${id} not found`);
  }

  return updated;
}


async function destroy(id) {
  const deleted = await Order.findByIdAndDelete(id).exec();

  if (!deleted) {
    throw new Error(`Order with id ${id} not found`);
  }

  return deleted;
}

module.exports = {
  create,
  list,
  get,
  edit,
  destroy
};
