// db.js
const mongoose = require('mongoose');

/**
 * In this example, we are connecting to a MongoDB instance.
 * By default, it uses MongoDB Atlas URI if provided, otherwise connects to a local MongoDB (e.g., via Docker).
 * Replace credentials/URIs with secure environment variables in production.
 */

const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
