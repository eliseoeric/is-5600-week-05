const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Set the port
const port = process.env.PORT || 3000

// Boot the app
const app = express()

// Register public directory
app.use(express.static(__dirname + '/public'))

// Register middleware
app.use(bodyParser.json())
app.use(middleware.cors)

// Root route
app.get('/', api.handleRoot)

// Product routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Order routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
