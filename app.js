const express = require('express');
const app = express();
const api = require('./api');

// Middleware to parse JSON body
app.use(express.json());

// Product Routes
app.post('/products', api.createProduct);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

// Order Routes
app.post('/orders', api.createOrder);
app.get('/orders', api.listOrders);
app.get('/orders/:id', api.getOrder);
app.put('/orders/:id', api.editOrder);
app.delete('/orders/:id', api.deleteOrder);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
