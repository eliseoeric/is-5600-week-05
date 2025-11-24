// db.js
const mongoose = require('mongoose')

/**
 * In this example we are connecting to a local MongoDB instance. 
 * This instance is running via docker-compose in our GitHub Codespaces environment.
 * In a real-world application, you would want to use a cloud-based MongoDB service like MongoDB Atlas.
 */

const mongoUri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/products-db?authSource=admin'

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected successfully')
    console.log('📦 Database:', mongoose.connection.db.databaseName)
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message)
  })

module.exports = mongoose