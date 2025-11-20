// db.js
const mongoose = require('mongoose')

/**
 * In this example we are connecting to a local MongoDB instance.
 * This instance is running via docker-compose in our GitHub Codespaces environment.
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

module.exports = mongoose
