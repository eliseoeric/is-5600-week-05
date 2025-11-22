const express = require('express')
const api = require('./api')
const middleware = require('./middleware') 
const bodyParser = require('body-parser')


// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory (static files)
app.use(express.static(__dirname + '/public'));

// --- GLOBAL MIDDLEWARE ---
app.use(middleware.cors) 
app.use(bodyParser.json())

// --- PRODUCT ROUTES ---
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// --- ORDER ROUTES ---
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder) 
// NEW ROUTES
app.put('/orders/:id', api.editOrder)     // Handles order update request
app.delete('/orders/:id', api.deleteOrder) // Handles order delete request

// --- ERROR HANDLING MIDDLEWARE ---

// 404 Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

// 500 Generic Error Handler
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error.message,
    // Only show stacktrace in development mode
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack, 
  })
})

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))