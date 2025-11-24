const db = require('../db');
const Products = require('../products');
const products = require('../data/full-products.json');

(async () => {
  try {
    console.log('📦 Importing products...');

    for (const product of products) {
      try {
        const created = await Products.create(product);
        console.log('✅ Added:', created._id);
      } catch (err) {
        console.error('❌ Failed to import product:', err.message);
      }
    }

    console.log('🎉 Import complete');
    process.exit(0);
  } catch (err) {
    console.error('🔥 Fatal import error:', err.message);
    process.exit(1);
  }
})();
