const mongoose = require('./db');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  list: () => Product.find(),
  get: (id) => Product.findById(id),
  create: (fields) => new Product(fields).save(),
  update: (id, fields) =>
    Product.findByIdAndUpdate(id, fields, { new: true }),
  remove: (id) => Product.findByIdAndDelete(id)
};