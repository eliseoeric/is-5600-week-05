const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const api = require('./api');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json

// Routes
app.use('/api', api);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/lab-products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
});

module.exports = app;