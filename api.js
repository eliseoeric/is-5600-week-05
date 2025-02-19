
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  res.json(product)
}


async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(orders)
}

/**
 
 * List orders
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}

module.exports = autoCatch({
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders
});