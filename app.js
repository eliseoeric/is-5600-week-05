// app.js
const express = require('express')
const api = require('./api')
const middleware = require('./middleware')

// Set the port
const port = process.env.PORT || 3000

// Boot the app
const app = express()

// Register the public directory
app.use(express.static(__dirname + '/public'))

// Register middleware
app.use(express.json())
app.use(middleware.cors)

// Register root & product routes
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Register order routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.get('/orders/:id', api.getOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Error handling middleware
app.use(middleware.handleError)
app.use(middleware.notFound)

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))