const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // This field is required
  },
  price: {
    type: Number,
    required: true, // This field is required
  },
  description: String, // Optional description of the product
  image: String, // Optional URL or path to the image
});

// Export the Product model based on the schema
module.exports = mongoose.model('Product', productSchema);
