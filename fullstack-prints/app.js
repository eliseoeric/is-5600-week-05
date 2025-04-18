const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./api'); // Import API routes from api.js
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fullstack-prints', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected ✅');
});

// Use API routes
app.use('/api', apiRoutes);

// Set the app to listen on a specific port
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});
