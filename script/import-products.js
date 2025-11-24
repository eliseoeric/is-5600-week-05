const db = require('../lib/db')
const Products = require('../products')

const products = require('../data/full-products.json')

;(async () => {
  // attempt to connect (will skip if no URI)
  await db.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin')

  // loop over the products and create them
  for (let i = 0; i < products.length; i++) {
    try {
      console.log(await Products.create(products[i]))
    } catch (err) {
      console.error('Error creating product:', err.message)
    }
  }

  // close mongoose connection if connected
  try {
    const mongoose = require('../lib/db').mongoose
    if (mongoose && mongoose.connection && mongoose.connection.close) {
      await mongoose.connection.close()
    }
  } catch (err) {
    // ignore
  }
})()
