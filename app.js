const express = require('express');
const mongoose = require('mongoose');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(middleware.cors);

// API Routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);
app.post('/products', api.createProduct);

// MongoDB Connection
const mongoURI = 'mongodb+srv://duggiralakranthikumar1:Kranthi123@cluster0.tixmqfi.mongodb.net/productsDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
  });
