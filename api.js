let products = [];
let idCounter = 1;

// Root
exports.handleRoot = (req, res) => {
  res.send("Welcome to Products API");
};

// GET all products
exports.listProducts = (req, res) => {
  res.json(products);
};

// GET single product
exports.getProduct = (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
};

// CREATE product
exports.createProduct = (req, res) => {
  const newProduct = {
    id: idCounter++,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description || ""
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// UPDATE product
exports.editProduct = (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  products[index] = {
    ...products[index],
    ...req.body
  };

  res.json(products[index]);
};

// DELETE product
exports.deleteProduct = (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.json({ message: "Deleted" });
};