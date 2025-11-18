const { mongoose } = require('./db')

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
  tags: [{
    id: String,
    title: String
  }],
  images: [String],
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
