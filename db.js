// db.js
const mongoose = require('mongoose')
console.log('connecting')
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://aishkhandekar:aishkhandekar@cluster0.nb9eh1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Note you'll need to put in your own credentials here//
  // {
  //   useNewUrlParser: true,
  // }
).then(x => console.log('connected'))

module.exports = mongoose