const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const middleware = require('./middleware')
const path = require('path')

const app = express()
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Middleware
app.use(bodyParser.json())

// Product routes
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// Order routes
app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Boot the server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))
