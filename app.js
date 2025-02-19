const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()

// Register the public directory
app.use(express.static(__dirname + '/public'));

// Register middleware
app.use(bodyParser.json())
app.use(middleware.cors)

// Define API routes
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// ✅ Fix: Corrected the order routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder) // ✅ Changed from get to post

// Boot the server
app.listen(port, () => console.log('Server listening on port ${port}'))