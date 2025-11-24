require('dotenv').config();
const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;
const app = express();

// static files
app.use(express.static(__dirname + '/public'));

// routes
app.use(bodyParser.json());
app.use(middleware.cors);

app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);
app.get('/orders', api.listOrders);
app.post('/orders', api.createOrder);

// start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
