// db.js
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/?authSource=admin';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MONGO CONNECTED');
    console.log('   URI:', uri);
  })
  .catch(err => {
    console.error('❌ MONGO CONNECT ERROR', err && err.message ? err.message : err);
  });
mongoose.connection.on('connected', () => console.log('MONGO EVENT: connected'));
mongoose.connection.on('error', err => console.error('MONGO EVENT: error', err && err.message ? err.message : err));
mongoose.connection.on('disconnected', () => console.warn('MONGO EVENT: disconnected'));
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MONGO CONNECTION CLOSED (app termination)');
  process.exit(0);
});

module.exports = mongoose;
