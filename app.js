// app.js
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')

const app = express()

// Middleware
app.use(bodyParser.json())

// ✅ Root Route (fix for "Cannot GET /")
app.get('/', (req, res) => {
  res.send('✅ API is running! Use /products or /orders')
})

// ----------------- Product Routes -----------------
app.post('/products', api.createProduct)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// ----------------- Order Routes -----------------
app.post('/orders', api.createOrder)
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// ----------------- Start Server -----------------
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})

module.exports = app
