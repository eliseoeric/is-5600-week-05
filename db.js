
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://root:example@localhost:27017/?authSource=admin'
)

module.exports = mongoose