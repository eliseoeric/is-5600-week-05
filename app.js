const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(middleware.cors);

app.get('/', api.handleRoot);
app.route('/products')
   .get(api.listProducts)
   .post(api.createProduct);
app.route('/products/:id')
   .get(api.getProduct)
   .put(api.editProduct)
   .delete(api.deleteProduct);

app.route('/orders')
   .get(api.listOrders)
   .post(api.createOrder);
app.route('/orders/:id')
   .put(api.editOrder)
   .delete(api.deleteOrder);

app.listen(port, () => console.log(`Server listening on port ${port}`));
