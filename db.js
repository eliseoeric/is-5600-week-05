const mongoose = require('mongoose')

mongoose. connect(
  process.env.MONGODB_URI || 'mongodb+srv://merclydia28:fVMUd4HiO4JEpFgx@cluster0.8hilv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

  {
    useNewUrlParser: true,
  }
)


module.exports = mongoose 