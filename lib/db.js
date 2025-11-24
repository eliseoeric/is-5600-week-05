const mongoose = require('mongoose')

async function connect(uri) {
  if (!uri) {
    console.log('No MONGO_URI provided, skipping MongoDB connection.')
    return
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
  }
}

module.exports = {
  connect,
  mongoose
}
