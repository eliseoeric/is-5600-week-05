const express = require('express');
const api = require('./api');

const app = express();
app.use(express.json());

// Example routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));