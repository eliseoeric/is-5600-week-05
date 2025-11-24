// app.js
const express = require('express')
const path = require('path')

const api = require('./api')
// We don't need body-parser or middleware here:
/// const bodyParser = require('body-parser')
/// const middleware = require('./middleware')

const app = express()

// --- MIDDLEWARE ---
// Use Express's built-in JSON parser
app.use(express.json())

// --- ROUTES ---

// Home route – serve your index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
  // If your assignment *requires* api.handleRoot, you could do:
  // return api.handleRoot(req, res)
})

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

// --- SERVER START ---
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
