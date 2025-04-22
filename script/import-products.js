const db = require('../db')
const Products = require('../products')
const products = require('../data/full-products.json')

;(async () => {
  try {
    for (let i = 0; i < products.length; i++) {
      const created = await Products.create(products[i])
      console.log(`Imported: ${created._id}`)
    }

    console.log('All products imported successfully.')
    process.exit(0)
  } catch (err) {
    console.error('Failed to import products:', err)
    process.exit(1)
  }
})()