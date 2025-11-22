// db.js
const mongoose = require('mongoose')

/**
 * Connecting to MongoDB Atlas cloud database
 */

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://db_user:fBdyomGruGYcjjAk@learningcluster.lhttbyq.mongodb.net/?appName=LearningCluster',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

// Add connection event listeners for debugging
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected')
})

module.exports = mongoose