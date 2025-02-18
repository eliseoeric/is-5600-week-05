const express = require('express')
const api = require('./api')

const app = express()
app.use(express.json())

app.get('/orders', api.listOrders)
app.post('/orders', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

app.listen(3000, () => console.log('Server running on port 3000'))