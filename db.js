
const mongoose = require('mongoose')

/**
 * Connect to the MongoDB instance running
 * in our GitHub Codespaces environment.
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

module.exports = mongoose
