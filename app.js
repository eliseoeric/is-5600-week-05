const express = require('express');
const api = require('./api');
const middleware = require('./middleware');

// Set the port
const port = process.env.PORT || 3000;

// Boot the app
const app = express();

// Register the public directory
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(express.json()); // Instead of body-parser
app.use(middleware.cors);

// Routes
app.get('/', api.handleRoot);

app.get('/products', api.listProducts);
app.post('/products', api.createProduct);
app.get('/products/:id', api.getProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder); // Fixed to POST

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
