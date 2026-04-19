const db = require('../db')
const Products = require('../products')
const products = require('../data/full-products.json')

;(async () => {
  await db.connect()

  for (let i = 0; i < products.length; i++) {
    console.log(await Products.create(products[i]))
  }

  process.exit(0)
})().catch(err => {
  console.error(err)
  process.exit(1)
})
