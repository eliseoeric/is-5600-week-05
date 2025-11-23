const express = require('express');
const path = require('path');
const api = require('./api');
const middleware = require('./middleware');

const app = express();
app.use(middleware.cors);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', api.handleRoot);

app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);
app.put('/orders/:id', api.editOrder);
app.delete('/orders/:id', api.deleteOrder);

app.use(middleware.notFound);
app.use(middleware.handleError);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
