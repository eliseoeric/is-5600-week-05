// app.js
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT || 3000

const app = express()

// Register middleware
app.use(middleware.cors)
app.use(bodyParser.json())

// Serve static files
app.use(express.static('public'))

// Register routes
app.get('/', api.handleRoot)

// Products routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders routes
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Error handling middleware
app.use(middleware.handleError)
app.use(middleware.notFound)

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})