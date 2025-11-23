const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI ||
  'mongodb://root:example@localhost:27017/?authSource=admin';

mongoose.connect(uri)
  .then(() => console.log("MONGO: connected"))
  .catch(err => console.error("MONGO ERROR:", err.message));

module.exports = mongoose;
