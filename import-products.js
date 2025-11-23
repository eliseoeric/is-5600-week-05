// script/import-products.js
const fs = require('fs').promises
const path = require('path')

require('../db') // connect
const Products = require('../products')

;(async () => {
  const file = path.join(__dirname, '../data/products.json')
  const data = JSON.parse(await fs.readFile(file, 'utf8'))

  let ok = 0
  for (const p of data) {
    await Products.create(p)
    ok++
  }
  console.log(`Imported ${ok} products`)
  process.exit(0)
})().catch(err => {
  console.error(err)
  process.exit(1)
})
