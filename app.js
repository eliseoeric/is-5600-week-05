const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Set the port
const port = process.env.PORT || 3000

// Boot the app
const app = express()

// Register the public directory
app.use(express.static(__dirname + '/public'))

// Middleware
app.use(bodyParser.json())
app.use(middleware.cors)

// ROUTES
app.get('/', api.handleRoot)

// PRODUCT ROUTES
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// ORDER ROUTES (⬅️ MOVE THEM HERE)
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Boot the server (⬅️ ALWAYS LAST)
app.listen(port, () => console.log(`Server listening on port ${port}`))
