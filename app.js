const express = require('express')
const app = express()

const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Set the port
const port = process.env.PORT || 3000

// Serve static files
app.use(express.static(__dirname + '/public'))

// Middleware
app.use(bodyParser.json())
app.use(middleware.cors)

// Register root route
app.get('/', api.handleRoot)

// Register Products routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Register Orders routes
app.get('/orders', api.listOrders)     // list orders
app.post('/orders', api.createOrder)   // create order
app.put('/orders/:id', api.editOrder)  // edit order
app.delete('/orders/:id', api.deleteOrder) // delete order

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))
