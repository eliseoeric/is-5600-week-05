const express = require('express')
const middleware = require('./middleware')
const api = require('./api')

const app = express()
const port = process.env.PORT || 3000

app.use(middleware.cors)
app.use(express.json())
app.use(express.static('public'))

// Product routes
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

// Order routes
app.get('/orders', api.listOrders)
app.get('/orders/:id', api.getOrder)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)         // ← INDEPENDENT TASK
app.delete('/orders/:id', api.deleteOrder)    // ← INDEPENDENT TASK

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app