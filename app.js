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
// register the routes
app.use(bodyParser.json())
app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))
// app.js
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')

const app = express()
app.use(bodyParser.json())

// Products endpoints
app.post('/products', api.createProduct)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders endpoints
app.post('/orders', api.createOrder)
app.get('/orders', api.listOrders)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// basic error handler for dev
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).json({ error: err.message })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app

