const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin'

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log(' Connected to MongoDB successfully!'))
  .catch(err => {
    console.error(' MongoDB connection error:', err)
    process.exit(1) // Exit the process if connection fails
  })

module.exports = mongoose