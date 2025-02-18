const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

async function listProducts(req, res, next) {
  try {
    const { offset = 0, limit = 25, tag } = req.query;
    const products = await Products.list({ offset: Number(offset), limit: Number(limit), tag });
    res.json(products);
  } catch (error) {
    next(error);
  }
}
async function getProduct(req, res, next) {
  try {
    const product = await Products.get(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function editProduct(req, res, next) {
  try {
    const updatedProduct = await Products.edit(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await Products.destroy(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await Orders.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const { offset = 0, limit = 25, productId, status } = req.query;
    const orders = await Orders.list({ offset: Number(offset), limit: Number(limit), productId, status });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function editOrder(req, res, next) {
  try {
    const updatedOrder = await Orders.edit(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id);
    res.json({ message: 'Order deleted successfully' });
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
