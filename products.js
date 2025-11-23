const cuid = require('cuid');
const db = require('./db');

const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: String,
  alt_description: String,
  likes: Number,
  urls: Object,
  links: Object,
  user: Object,
  tags: Array
});

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;
  const query = tag ? { "tags.title": tag } : {};
  return Product.find(query).skip(offset).limit(limit);
}

async function get(id) {
  return Product.findById(id);
}

async function create(fields) {
  return Product.create(fields);
}

async function edit(id, change) {
  return Product.findByIdAndUpdate(id, change, { new: true });
}

async function destroy(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = { list, get, create, edit, destroy };
