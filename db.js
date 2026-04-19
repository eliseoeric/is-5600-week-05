const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin'
)

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

module.exports = mongoose