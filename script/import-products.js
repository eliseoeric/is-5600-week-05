// script/import-products.js
const fs = require('fs')
const Products = require('../products')

async function run() {
  const raw = fs.readFileSync('./data/full-products.json', 'utf8')
  const items = JSON.parse(raw)

  for (const item of items) {
    await Products.create(item)
  }

  console.log(`Imported ${items.length} products`)
  process.exit()
}

run()
