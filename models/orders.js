// orders.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: String, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
