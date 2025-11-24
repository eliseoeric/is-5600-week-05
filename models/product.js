const mongoose = require('mongoose')
const cuid = require('cuid')

const TagSchema = new mongoose.Schema({
  title: { type: String, required: true }
}, { _id: false })

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: String,
  portfolio_url: String,
  username: { type: String, required: true }
}, { _id: false })

const ProductSchema = new mongoose.Schema({
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true }
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true }
  },
  user: UserSchema,
  tags: [TagSchema]
})

module.exports = mongoose.model('Product', ProductSchema)
