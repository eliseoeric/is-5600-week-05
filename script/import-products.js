// script/import-products.js
const fs = require('fs')
const path = require('path')
const db = require('../db')
const Products = require('../products')

async function importData () {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'products.json')
    if (!fs.existsSync(dataPath)) {
      console.error('products.json not found at', dataPath)
      process.exit(1)
    }

    const raw = fs.readFileSync(dataPath, 'utf8')
    const products = JSON.parse(raw)

    for (const p of products) {
      // ensure required fields exist; skip duplicates by id if needed
      try {
        await Products.create(p)
        console.log('Imported product:', p.id || p._id || 'new')
      } catch (err) {
        console.error('Failed to import product:', err.message)
      }
    }

    console.log('Import complete')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

importData()

