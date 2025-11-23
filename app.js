// app.js
const express = require('express')
const path = require('path')

const api = require('./api')
const middleware = require('./middleware')

require('./db')   // ⬅️ very important: ensures MongoDB connects

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(middleware.cors)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Product routes
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.updateProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.updateOrder)
app.delete('/orders/:id', api.deleteOrder)

// 404 + error handler
app.use(middleware.notFound)
app.use(middleware.handleError)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
