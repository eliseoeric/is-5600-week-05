const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Set the port
const port = process.env.PORT || 5000
// Boot the app
const app = express()
// Register the public directory
app.use(express.static(__dirname + '/public'));
// register the routes
app.use(bodyParser.json())
app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// Connect to MongoDB (Lab 05)
const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
  console.warn('MONGO_URI is not set. Please configure your MongoDB connection string.')
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))
}

// Boot the server
app.listen(port, '0.0.0.0', () => console.log(`Server listening on port ${port}`))
