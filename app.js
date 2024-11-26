app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

app.get('/orders', api.listOrders)
app.get('/orders/', api.createOrder)
app.get('/orders/', api.editOrder)
app.get('/orders/', api.deleteOrder)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))
