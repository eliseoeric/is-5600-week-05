// app.js
const express = require('express')
const api = require('./api')

const app = express()
app.use(express.json())

// Products routes
app.post('/products', api.createProduct)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)  // Changed from app.get to app.post and removed trailing slash to fix error

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app
