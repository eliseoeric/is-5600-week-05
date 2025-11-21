const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const api = require("./api")
const middleware = require("./middleware")

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(middleware.cors)

/* PRODUCT ROUTES */
app.get("/", api.handleRoot)
app.get("/products", api.listProducts)
app.get("/products/:id", api.getProduct)
app.post("/products", api.createProduct)
app.put("/products/:id", api.editProduct)
app.delete("/products/:id", api.deleteProduct)

/* ORDER ROUTES */
app.get("/orders", api.listOrders)
app.get("/orders/:id", api.getOrder)
app.post("/orders", api.createOrder)
app.put("/orders/:id", api.editOrder)
app.delete("/orders/:id", api.deleteOrder)

app.use(middleware.notFound)
app.use(middleware.handleError)

app.listen(port, () => console.log(`Server listening on port ${port}`))
