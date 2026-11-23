const db = require('../db')
const Products = require('../products')
const products = require('../data/full-products.json')

async function importProducts () {
  let imported = 0
  for (const product of products) {
    // Keep the source ID so running the import again does not add duplicates.
    if (await Products.get(product.id)) continue
    await Products.create({ ...product, _id: product.id })
    imported++
  }
  return imported
}
if (require.main === module) {
  ;(async () => {
    try {
      await db.connectDatabase()
      console.log(`Imported ${await importProducts()} products`)
    } catch (error) {
      console.error('Import failed:', error.message)
      process.exitCode = 1
    } finally {
      await db.disconnect()
    }
  })()
}
module.exports = importProducts
