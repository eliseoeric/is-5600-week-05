const Products = require('./products')

async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;

  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  });

  res.json(products);
}


async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id)
  res.json(product)
}

async function editProduct(req, res, next) {
  const product = await Products.edit(req.params.id, req.body)
  res.json(product)
}

async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  editProduct,
  deleteProduct
}
// test change
