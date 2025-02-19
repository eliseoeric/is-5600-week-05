const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(error => console.error('❌ MongoDB Connection Error:', error));

module.exports = mongoose;
