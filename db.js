const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI ||
  'mongodb://root:example@localhost:27017/?authSource=admin'

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error))

module.exports = mongoose
