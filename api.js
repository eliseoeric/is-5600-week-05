const Orders = require('./orders')

async function createOrder(req, res, next) {
  try {
    const order = await Orders.create(req.body)
    res.json(order)
  } catch (err) {
    next(err)
  }
}

async function listOrders(req, res, next) {
  try {
    const { offset = 0, limit = 25, productId, status } = req.query
    const orders = await Orders.list({ 
      offset: Number(offset), 
      limit: Number(limit),
      productId, 
      status 
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

async function editOrder(req, res, next) {
  try {
    const updatedOrder = await Orders.edit(req.params.id, req.body)
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
}

async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

module.exports = { createOrder, listOrders, editOrder, deleteOrder }

