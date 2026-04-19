const express = require('express')
const api = require('./api')
const middleware = require('./middleware')

const app = express()

app.use(express.json())
app.use(middleware.cors)

app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.updateProduct)
app.delete('/products/:id', api.deleteProduct)

app.use(middleware.notFound)
app.use(middleware.handleError)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server listening on port', port)
})