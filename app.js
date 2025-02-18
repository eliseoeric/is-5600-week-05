const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')
app.get('/orders', api.listOrders)
app.get('/orders/', api.createOrder)


// Set the port
@@ -19,6 +21,8 @@ app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))
