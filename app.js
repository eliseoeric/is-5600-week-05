const express = require('express')
const api = require('./api')

const app = express()
app.use(express.json())

// Products
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Orders
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Root
app.get('/', api.handleRoot)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})