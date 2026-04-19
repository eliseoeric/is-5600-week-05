const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@localhost:27017/?authSource=admin')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

module.exports = mongoose;