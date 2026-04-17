const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Setup
const app = express();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))


// Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  alt_description: String,
  price: Number,
  image: String,
  tags: [String],
  user: {
    name: String
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', handleRoot);
app.get('/products', listProducts);
app.get('/products/:id', getProduct);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* ---------------- ROUTES ---------------- */

// Root
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

/* ---------------- GET ALL (FILTER + PAGINATION) ---------------- */

async function listProducts(req, res) {
  try {
    const { offset = 0, limit = 25, tag } = req.query;

    let query = {};

    // FILTER (description + alt_description + user.name)
    if (tag) {
      query = {
        $or: [
          { description: { $regex: tag, $options: 'i' } },
          { alt_description: { $regex: tag, $options: 'i' } },
          { 'user.name': { $regex: tag, $options: 'i' } }
        ]
      };
    }

    const products = await Product.find(query)
      .skip(Number(offset))
      .limit(Number(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* ---------------- GET ONE ---------------- */

async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* ---------------- CREATE ---------------- */

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    const saved = await product.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* ---------------- UPDATE ---------------- */

async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* ---------------- DELETE ---------------- */

async function deleteProduct(req, res) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}