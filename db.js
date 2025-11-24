// db.js
const mongoose = require('mongoose')

// replace "my db" with your actual database name if needed
mongoose.connect('mongodb://localhost:27017/my db')

module.exports = mongoose
