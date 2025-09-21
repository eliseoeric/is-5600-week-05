const express = require('express')
const path = require('path')
const api = require('./api')

const app = express()

app.use(express.json())

// Root
app.get('/', api.handleRoot)

// Products routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)      // <-- add
app.delete('/orders/:id', api.deleteOrder) // <-- add

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`listening on ${PORT}`)
})


