const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const middleware = require('./middleware')

// Set the port
const port = process.env.PORT || 3000

// Boot the app
const app = express()

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(middleware.cors)

// Routes
app.get('/', api.handleRoot)

// Product routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Order routes
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})