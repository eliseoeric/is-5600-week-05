const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')


// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
app.use(express.static(__dirname + '/public'));
// register the routes
app.use(bodyParser.json())
app.use(middleware.cors)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

app.get('/orders', api.listOrders)
app.post('/orders/', api.createOrder)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const orders = require('./orders'); // Import your orders module

app.use(bodyParser.json());

// Register the route to edit an order
app.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await orders.edit(req.params.id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

// Register the route to delete an order
app.delete('/orders/:id', async (req, res) => {
  try {
    await orders.destroy(req.params.id);
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

// Existing routes for products and other modules go here...

module.exports = app;