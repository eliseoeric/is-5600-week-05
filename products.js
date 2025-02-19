const cuid = require('cuid');
const db = require('./db');

const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true }
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true }
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true }
  },
  tags: [{ title: { type: String, required: true } }]
});

async function list({ offset = 0, limit = 25, tag } = {}) {
  const query = tag ? { tags: { $elemMatch: { title: tag } } } : {};
  return await Product.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

async function get(_id) {
  return await Product.findById(_id);
}

async function create(fields) {
  const product = new Product(fields);
  await product.save();
  return product;
}

async function edit(_id, changes) {
  return await Product.findByIdAndUpdate(_id, changes, { new: true });
}

async function destroy(_id) {
  return await Product.deleteOne({ _id });
}

module.exports = { list, get, create, edit, destroy };