
const cuid = require('cuid');
const db = require('./db');


// Define our Product Model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [{
    title: { type: String, required: true },
  }],
});
const query = tag
    ? { tags: { $elemMatch: { title: tag } } }
    : {};

  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return products;


/**
 * Get a single product by id
 */
async function get(_id) {
  return await Product.findById(_id);
}
async function create(fields) {
  const product = new Product(fields);
  await product.save();
  return product;
}
async function edit(_id, change) {
  const product = await get(_id);
  if (!product) {
    throw new Error('Product not found');
  }
  Object.keys(change).forEach(key => {
    product[key] = change[key];
  });

  await product.save();
  return product;
}

/**
 * Delete a product
 */
async function destroy(_id) {
  const product = await Product.findById(_id);
  if (!product) {
    throw new Error('Product not found');
  }
  await Product.deleteOne({ _id });
  return { success: true, message: 'Product deleted successfully' };
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy,
};