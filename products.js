const fs = require('fs').promises
const path = require('path')
const cuid = require('cuid')

const productsFile = path.join(__dirname, 'data/full-products.json')

// Try to use Mongoose model when available
let ProductModel
try {
  ProductModel = require('./models/product')
} catch (err) {
  ProductModel = null
}

async function readProductsFile() {
  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
}

async function writeProductsFile(products) {
  return fs.writeFile(productsFile, JSON.stringify(products, null, 2))
}

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  // Use DB if model available and connected
  try {
    const mongoose = require('./lib/db').mongoose
    if (ProductModel && mongoose && mongoose.connection.readyState === 1) {
      const query = {}
      if (tag) query['tags.title'] = tag
      return ProductModel.find(query).skip(offset).limit(limit).lean()
    }
  } catch (err) {
    // fall through to file-based fallback
  }

  const products = await readProductsFile()
  return products
    .filter(product => {
      if (!tag) return true
      return product.tags && product.tags.find(({ title }) => title == tag)
    })
    .slice(offset, offset + limit)
}

async function get(_id) {
  try {
    const mongoose = require('./lib/db').mongoose
    if (ProductModel && mongoose && mongoose.connection.readyState === 1) {
      return ProductModel.findById(_id).lean()
    }
  } catch (err) {
    // fallback to file
  }

  const products = await readProductsFile()
  return products.find(p => p._id === _id || p.id === _id) || null
}

async function create(data) {
  const toSave = Object.assign({}, data)

  try {
    const mongoose = require('./lib/db').mongoose
    if (ProductModel && mongoose && mongoose.connection.readyState === 1) {
      const product = await new ProductModel(toSave).save()
      return product.toObject()
    }
  } catch (err) {
    // fallback
  }

  const products = await readProductsFile()
  // ensure fallback has an _id
  if (!toSave._id && !toSave.id) toSave._id = cuid()
  products.unshift(toSave)
  await writeProductsFile(products)
  return toSave
}

async function edit(_id, data) {
  try {
    const mongoose = require('./lib/db').mongoose
    if (ProductModel && mongoose && mongoose.connection.readyState === 1) {
      const product = await ProductModel.findById(_id)
      if (!product) return null
      Object.keys(data).forEach(key => {
        product[key] = data[key]
      })
      await product.save()
      return product.toObject()
    }
  } catch (err) {
    // fallback
  }

  const products = await readProductsFile()
  const idx = products.findIndex(p => p._id === _id || p.id === _id)
  if (idx === -1) return null
  products[idx] = Object.assign({}, products[idx], data)
  await writeProductsFile(products)
  return products[idx]
}

async function destroy(_id) {
  try {
    const mongoose = require('./lib/db').mongoose
    if (ProductModel && mongoose && mongoose.connection.readyState === 1) {
      const deleted = await ProductModel.findByIdAndDelete(_id).lean()
      return deleted
    }
  } catch (err) {
    // fallback
  }

  const products = await readProductsFile()
  const idx = products.findIndex(p => p._id === _id || p.id === _id)
  if (idx === -1) return null
  const [removed] = products.splice(idx, 1)
  await writeProductsFile(products)
  return removed
}

module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}