/**
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res, next) {
  try {
    console.log('request body:', req.body);
    const product = await Products.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function editProduct(req, res, next) {
  try {
    const change = req.body;
    const product = await Products.edit(req.params.id, change);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await Products.destroy(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await Orders.create(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const { offset = 0, limit = 25, productId, status } = req.query;
    const orders = await Orders.list({ 
      offset: Number(offset), 
      limit: Number(limit),
      productId, 
      status 
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function editOrder(req, res, next) {
  try {
    const change = req.body;
    const order = await Orders.edit(req.params.id, change);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});
