const mongoose = require('mongoose')

/**
 * Connect to MongoDB
 * @param {string} uri - MongoDB connection string
 * @returns {Promise}
 */
async function connect(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
    return mongoose.connection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise}
 */
async function disconnect() {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('MongoDB disconnection error:', error)
    throw error
  }
}

module.exports = {
  connect,
  disconnect,
  mongoose
}
