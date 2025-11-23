const Product = require('./models/Product');

// GET /
function handleRoot(req, res) {
  res.send("Products API Running");
}

// GET /products
async function listProducts(req, res) {
  const products = await Product.find();
  res.json(products);
}

// GET /products/:id
async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  res.json(product);
}

// POST /products
async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.json(product);
}

// PUT /products/:id
async function editProduct(req, res) {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
}

// DELETE /products/:id
async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
}

module.exports = {
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
};
