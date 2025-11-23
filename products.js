const mongoose = require("mongoose");
const cuid = require("cuid");

const ProductSchema = new mongoose.Schema({
  _id: { type: String, default: cuid },
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", ProductSchema);

exports.list = async function () {
  return await Product.find();
};

exports.get = async function (id) {
  return await Product.findById(id);
};

exports.create = async function (fields) {
  return await Product.create(fields);
};

exports.edit = async function (id, fields) {
  return await Product.findByIdAndUpdate(id, fields, { new: true });
};

exports.destroy = async function (id) {
  return await Product.findByIdAndDelete(id);
};
