const db = require('../db');
const Products = require('../products');

const products = require('../data/full-products.json');

;(async () => {
  try {
    for (let i = 0; i < products.length; i++) {
      console.log(await Products.create(products[i]));
    }
    console.log('Product import completed')
  } catch (error) {
    console.error('Product import failed:', error)
    process.exitCode = 1
  } finally {
    await db.disconnect()
  }
})()
