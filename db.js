// db.js
const mongoose = require('mongoose')

/**
 * Connect to MongoDB.
 * By default, it connects to the local MongoDB instance running in Codespaces via Docker.
 * You can override this with a MONGODB_URI environment variable (e.g., MongoDB Atlas connection string).
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin'
)

const db = mongoose.connection

db.on('connected', () => {
  console.log('✅ MongoDB connected')
})

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err)
})

db.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected')
})

module.exports = mongoose
