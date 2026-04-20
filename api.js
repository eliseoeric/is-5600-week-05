const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// ================= DATABASE CONNECTION =================
// 🔴 REPLACE WITH YOUR OWN ATLAS CONNECTION STRING
mongoose.connect("mongodb+srv://kotimanda321_db_user:<db_password>@cluster0.p2swzse.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

// ================= MODEL =================
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
})

const Product = mongoose.model("Product", productSchema)

// ================= ROUTES =================

// HOME ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

// GET ALL PRODUCTS
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE PRODUCT
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = app