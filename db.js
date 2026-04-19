// db.js
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://lyxtm2013_db_user:AAgYGVHkVPRSnckR@ac-ndlk3cq-shard-00-00.rwwthve.mongodb.net:27017,ac-ndlk3cq-shard-00-01.rwwthve.mongodb.net:27017,ac-ndlk3cq-shard-00-02.rwwthve.mongodb.net:27017/?ssl=true&replicaSet=atlas-364hbu-shard-0&authSource=admin&appName=Cluster0'
)

module.exports = mongoose