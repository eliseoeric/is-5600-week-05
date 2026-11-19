# Lab 5 Testing Guide

## Start the application

```bash
npm install
npm start
```

The console should display:

```text
Server listening on port 3000
Connected to MongoDB
```

## Import the sample products

Stop the server with `Ctrl+C`, then run:

```bash
node script/import-products.js
npm start
```

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | /products | List products |
| GET | /products/:id | Get one product |
| POST | /products | Create a product |
| PUT | /products/:id | Update a product |
| DELETE | /products/:id | Delete a product |
| GET | /orders | List orders |
| GET | /orders/:id | Get one order |
| POST | /orders | Create an order |
| PUT | /orders/:id | Update an order |
| DELETE | /orders/:id | Delete an order |

Import `Lab5.postman_collection.json` into Postman. After importing products,
copy real product IDs from the GET products response into the create-order
request body before sending it.
