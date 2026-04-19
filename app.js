const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// IMPORTANT: this connects MongoDB
require('./db');

// your existing api file
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

// routes (use your existing api.js functions)
app.get('/', (req, res) => {
  res.send('Server is working');
});

app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.editProduct);
app.delete('/products/:id', api.deleteProduct);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});