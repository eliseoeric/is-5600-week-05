const express = require('express')
const api = require('./api')
const db = require('./db');
const middleware = require('./middleware')
const bodyParser = require('body-parser')


// Set the port
const port = process.env.PORT || 3000
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

app.put('/orders/:id', api.editOrder)   // Route to update an order
app.delete('/orders/:id', api.deleteOrder)  // Route to delete an order

app.get('/orders', api.listOrders)  // Route to list all orders
app.post('/orders', api.createOrder)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

