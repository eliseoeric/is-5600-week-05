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

  tags: [
    {
      title: { type: String, required: true }
    }
  ]
});

/**
 * Create a product
 */
async function create(fields) {
  return await new Product(fields).save();
}

/**
 * List products with optional tag filter
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;

  const query = tag
    ? { tags: { $elemMatch: { title: tag } } }
    : {};

  return await Product.find(query)
    .sort({ _id: 1 })
    .skip(Number(offset))
    .limit(Number(limit))
    .exec();
}

/**
 * Get a single product
 */
async function get(id) {
  return await Product.findById(id).exec();
}

/**
 * Edit a product
 */
async function edit(id, changes) {
  const updated = await Product.findByIdAndUpdate(id, changes, {
    new: true
  }).exec();

  if (!updated) {
    throw new Error(`Product with id ${id} not found`);
  }

  return updated;
}

/**
 * Delete a product
 */
async function destroy(id) {
  const deleted = await Product.findByIdAndDelete(id).exec();

  if (!deleted) {
    throw new Error(`Product with id ${id} not found`);
  }

  return deleted;
}

module.exports = {
  create,
  list,
  get,
  edit,
  destroy
};
