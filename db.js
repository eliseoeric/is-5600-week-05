// db.js
const mongoose = require('mongoose');

/**
 * Connecting to a local MongoDB instance running via Docker Compose in Codespaces.
 * In a real-world application, you should use MongoDB Atlas.
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://saketh:1234@cluster0.gog5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
