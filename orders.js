const cuid = require('cuid')

const db = require('./db')

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
        enum: ['CREATED', 'PENDING', 'COMPLETED', 'CANCELED']
    }
})

async function list(options = {}) {
    const { offset = 0, limit = 25, productId, status } = options;

    const productQuery = productId ? {
        products: productId
    } : {}

    const statusQuery = status ? {
        status: status
    } : {}

    const query = {
        ...productQuery,
        ...statusQuery
    }

    const orders = await Order.find(query)
        .sort({ _id: 1 })
        .skip(offset)
        .limit(limit)

    return orders
}

async function get (_id) {
    const order = await Order.findById(_id)
        .populate('products')
        .exec()
    
    return order
}

async function create (fields) {
    const order = await new Order(fields).save()
    await order.populate('products')
    return order
}

/**
 * NEW: Updates an existing order.
 * @param {string} _id
 * @param {object} change
 * @returns {Promise<object>}
 */
async function edit (_id, change) {
    const order = await Order.findByIdAndUpdate(
        _id,
        { $set: change },
        { new: true }
    )
    if (order) {
        await order.populate('products')
    }
    return order
}

/**
 * NEW: Deletes an order by ID.
 * @param {string} _id
 * @returns {Promise<object>}
 */
async function destroy (_id) {
    return await Order.deleteOne({ _id })
}

// Exporting all methods, including the new ones
module.exports = {
    get,
    list,
    create,
    edit,
    destroy
}