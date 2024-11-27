@@ -16,9 +16,13 @@ app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.get('/orders', api.listOrders)
app.get('/orders/', api.createOrder)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

 16 changes: 16 additions & 0 deletions16  
db.js
