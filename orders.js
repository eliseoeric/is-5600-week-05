const cuid = require('cuid')
const db = require('./lib/db')
let mongoose
try {
  mongoose = require('./lib/db').mongoose
} catch (err) {
  mongoose = null
}

let OrderModel
try {
  OrderModel = require('./lib/db').mongoose.model('Order')
} catch (err) {
  // ignore if not registered yet
}

if (!OrderModel && mongoose) {
  const OrderSchema = new mongoose.Schema({
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
  })

  OrderModel = mongoose.model('Order', OrderSchema)
}

async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options

  // if DB connected
  if (OrderModel && mongoose && mongoose.connection.readyState === 1) {
    const productQuery = productId ? { products: productId } : {}
    const statusQuery = status ? { status } : {}
    const query = { ...productQuery, ...statusQuery }
    return OrderModel.find(query).sort({ _id: 1 }).skip(offset).limit(limit)
  }

  // no JSON fallback implemented for orders in this lab
  return []
}

async function get(_id) {
  if (OrderModel && mongoose && mongoose.connection.readyState === 1) {
    return OrderModel.findById(_id).populate('products').exec()
  }
  return null
}

async function create(fields) {
  if (OrderModel && mongoose && mongoose.connection.readyState === 1) {
    const order = await new OrderModel(fields).save()
    await order.populate('products')
    return order
  }
  return null
}

async function edit(_id, change) {
  if (OrderModel && mongoose && mongoose.connection.readyState === 1) {
    const order = await OrderModel.findById(_id)
    if (!order) return null
    Object.keys(change).forEach(key => {
      order[key] = change[key]
    })
    await order.save()
    return order
  }
  return null
}

async function destroy(_id) {
  if (OrderModel && mongoose && mongoose.connection.readyState === 1) {
    return OrderModel.deleteOne({ _id })
  }
  return null
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}
