const db = require('../db');
const Products = require('../products');
const products = require('../data/full-products.json');

(async () => {
  for (let i = 0; i < products.length; i++) {
    try {
      console.log(await Products.create(products[i]));
    } catch (error) {
      console.error('❌ Error importing product:', error.message);
    }
  }
})();
