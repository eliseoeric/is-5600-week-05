
const connectDB = require('../db')
const products = require('../data/full-products.json')

;(async () => {
  try {
    // Connect to MongoDB first
    await connectDB()

    // Load the Products model after connecting
    const Products = require('../products')

    // Insert products into MongoDB
    for (let i = 0; i < products.length; i++) {
      const product = await Products.create(products[i])
      console.log(`Imported product: ${product._id}`)
    }

    console.log('All products imported successfully!')

    // Close the database connection
    const mongoose = require('mongoose')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Import failed:', error)
    process.exitCode = 1
  }
})()
