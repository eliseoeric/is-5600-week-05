//db.js 

const mongoose = require('mongoose');

// Use the local MongoDB that Codespaces runs in Docker.
const uri = 'mongodb://root:example@localhost:27017/?authSource=admin';

console.log('Connecting to Mongo with URI:', uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌:', err));

module.exports = mongoose;