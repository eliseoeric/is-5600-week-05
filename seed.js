// seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/is5600_lab';

/**
 * Helper: normalize an import so we end up with a Mongoose Model.
 * Accepts various export shapes:
 * - module.exports = mongoose.model('X', schema)
 * - exports.Product = mongoose.model(...)
 * - export default mongoose.model(...)
 * - module.exports = productSchema (a Mongoose Schema) -> will compile to model name fallbackName
 */
function normalizeToModel(imported, fallbackName) {
  if (!imported) return null;

  // Common shapes: default export or named property
  let candidate = imported.default || imported.Product || imported.Order || imported;

  // If it's already a model it will have deleteMany and modelName
  if (candidate && typeof candidate.deleteMany === 'function' && candidate.modelName) {
    return candidate;
  }

  // If candidate looks like a Mongoose Schema, compile it
  // A schema usually has a 'paths' property (object of schema paths)
  if (candidate && typeof candidate === 'object' && candidate.paths && Object.keys(candidate.paths).length >= 0) {
    const modelName = fallbackName || 'Model';
    // If model already compiled, return it
    if (mongoose.models[modelName]) return mongoose.models[modelName];
    return mongoose.model(modelName, candidate);
  }

  // If it's an object with the model under a property (catch-all)
  if (typeof candidate === 'object') {
    // try to find the first property that looks like a model
    for (const key of Object.keys(candidate)) {
      const v = candidate[key];
      if (v && typeof v.deleteMany === 'function' && v.modelName) return v;
      if (v && v.paths) {
        const modelName = key.charAt(0).toUpperCase() + key.slice(1);
        if (mongoose.models[modelName]) return mongoose.models[modelName];
        return mongoose.model(modelName, v);
      }
    }
  }

  // fallback: return candidate as-is (may fail later)
  return candidate;
}

async function seed() {
  try {
    // connect
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding');

    // === IMPORTANT PATH FIX ===
    // Your model files are inside the models/ folder, so require from there:
    const rawProduct = require('./models/products');
    const rawOrder = require('./models/orders');

    console.log('Raw product import:', !!rawProduct, Object.keys(rawProduct || {}).slice(0, 10));
    console.log('Raw order import:', !!rawOrder, Object.keys(rawOrder || {}).slice(0, 10));

    // Normalize to models (use fallback names that make sense)
    let Product = normalizeToModel(rawProduct, 'Product');
    let Order = normalizeToModel(rawOrder, 'Order');

    console.log('Normalized Product ->', Product && Product.modelName, 'has deleteMany?', !!(Product && Product.deleteMany));
    console.log('Normalized Order   ->', Order && Order.modelName, 'has deleteMany?', !!(Order && Order.deleteMany));

    if (!Product || typeof Product.deleteMany !== 'function') {
      throw new Error('Product import does not provide a valid Mongoose model or schema. Check ./models/products export.');
    }
    if (!Order || typeof Order.deleteMany !== 'function') {
      throw new Error('Order import does not provide a valid Mongoose model or schema. Check ./models/orders export.');
    }

    // Clear existing data
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared products and orders collections');

    // Sample products
    const products = await Product.insertMany([
      { name: 'Laptop', price: 1200 },
      { name: 'Phone', price: 800 },
      { name: 'Headphones', price: 150 },
      { name: 'Monitor', price: 300 }
    ]);
    console.log('Inserted products:', products.map(p => ({ id: p._id.toString(), name: p.name, price: p.price })));

    // Sample orders (use product ids)
    const orders = await Order.insertMany([
      { products: [products[0]._id, products[2]._id], status: 'pending', total: 1350 },
      { products: [products[1]._id], status: 'completed', total: 800 }
    ]);
    console.log('Inserted orders:', orders.map(o => ({ id: o._id.toString(), total: o.total, status: o.status })));

    console.log('Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
