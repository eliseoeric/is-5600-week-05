const mongoose = require("mongoose");
const cuid = require("cuid");

const OrderSchema = new mongoose.Schema({
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: "Product" }],
  status: {
    type: String,
    enum: ["CREATED", "PENDING", "COMPLETED"],
    default: "CREATED",
  },
});

const Order = mongoose.model("Order", OrderSchema);

exports.list = async () => {
  return await Order.find().populate("products");
};

exports.get = async (id) => {
  return await Order.findById(id).populate("products");
};

exports.create = async (fields) => {
  const order = await Order.create(fields);
  return await order.populate("products");
};

exports.edit = async (id, fields) => {
  const order = await Order.findById(id);
  if (!order) return null;
  Object.assign(order, fields);
  await order.save();
  return await order.populate("products");
};

exports.destroy = async (id) => {
  return await Order.deleteOne({ _id: id });
};
