// app.js
const express = require('express')
const api = require('./api')

const app = express()

// Middleware to parse JSON
app.use(express.json())

// Root route (homepage)
app.get('/', (req, res) => {
  res.send('🚀 Fullstack Prints API is running! Try /products or /orders')
})

/* -----------------------
   Products Routes
----------------------- */
app.post('/products', api.createProduct)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

/* -----------------------
   Orders Routes
----------------------- */
app.post('/orders', api.createOrder)
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

/* -----------------------
   Start Server
----------------------- */
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`)
})

module.exports = app
