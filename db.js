
require('dotenv').config()
const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB successfully!')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    throw error
  }
}

module.exports = connect
