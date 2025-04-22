const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  tags: [{ title: String, description: String }] // Example of nested tags
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
