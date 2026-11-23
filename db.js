const mongoose = require('mongoose')

// Codespaces supplies the local MongoDB service. Override for another database.
async function connect () {
  const uri = process.env.MONGODB_URI ||
    'mongodb://root:example@localhost:27017/products-db?authSource=admin'
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  return mongoose
}

module.exports = mongoose
module.exports.connectDatabase = connect
