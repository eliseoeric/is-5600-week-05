app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

app.get('/orders', api.listOrders)
app.post('/orders/', api.createOrder)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))