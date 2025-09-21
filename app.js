const express = require('express')
const cors = require('cors')
const api = require('./api')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Fullstack Prints API OK'))

app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)

app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

const port = process.env.PORT || 3000
const host = '0.0.0.0'
app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
