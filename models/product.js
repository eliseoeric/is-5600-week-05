const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

async function list(options = {}) {
    const { offset = 0, limit = 25, tag } = options;
  
    // Create the query object to filter by tag if provided
    const query = tag ? {
      tags: {
        $elemMatch: {
          title: tag
        }
      }
    } : {};
  
    // Query the MongoDB database using Mongoose
    const products = await Product.find(query)
      .sort({ _id: 1 })
      .skip(offset)
      .limit(limit);
  
    return products;
  }
  
  async function get(_id) {
  const product = await Product.findById(_id);
  return product;
}
