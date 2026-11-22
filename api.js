const Products = require('./products')
const Orders = require('./orders')
const path = require('path')

// Home page
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
}

// List products
async function listProducts(req, res, next) {
    const { offset = 0, limit = 25, tag } = req.query

    const products = await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag
    })

    res.json(products)
}

// Get a product
async function getProduct(req, res, next) {
    const product = await Products.get(req.params.id)

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    res.json(product)
}

// Create a product
async function createProduct(req, res, next) {
    const product = await Products.create(req.body)
    res.json(product)
}

// Edit a product
async function editProduct(req, res, next) {
    const product = await Products.edit(
        req.params.id,
        req.body
    )

    res.json(product)
}

// Delete a product
async function deleteProduct(req, res, next) {
    const response = await Products.destroy(req.params.id)
    res.json(response)
}

// List orders
async function listOrders(req, res, next) {
    const { offset = 0, limit = 25, productId, status } = req.query

    const orders = await Orders.list({
        offset: Number(offset),
        limit: Number(limit),
        productId,
        status
    })

    res.json(orders)
}

// Get an order
async function getOrder(req, res, next) {
    const order = await Orders.get(req.params.id)

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    res.json(order)
}

// Create an order
async function createOrder(req, res, next) {
    const order = await Orders.create(req.body)
    res.status(201).json(order)
}

// Edit an order
async function editOrder(req, res, next) {
    const order = await Orders.edit(
        req.params.id,
        req.body
    )

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    res.json(order)
}

// Delete an order
async function deleteOrder(req, res, next) {
    await Orders.destroy(req.params.id)

    res.json({
        message: 'Order deleted successfully'
    })
}

module.exports = {
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
    listOrders,
    getOrder,
    createOrder,
    editOrder,
    deleteOrder
}