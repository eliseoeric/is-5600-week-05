const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

/**
 * List products
 * @param {*} options 
 * @returns 
 */
async function list(options = {}) {

  const { offset = 0, limit = 25, tag } = options;

  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
    .filter(product => {
      if (!tag) {
        return product
      }

      return product.tags.find(({ title }) => title == tag)
    })
    .slice(offset, offset + limit) // Slice the products
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile))

  // Loop through the products and return the product with the matching id
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }

  // If no product is found, return null
  return null;
}

module.exports = {
  list,
  get
}
 const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)


  return products
  }


/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(_id) {
  const product = await Product.findById(_id)
  return product


}


async function create (fields) {
  const product = await new Product(fields).save()
  return product
}


async function edit (_id, change) {
  const product = await get(_id)


  // todo can we use spread operators here?
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })


  // Object.assign(product{...change});


  await product.save()


  return product
}


async function destroy (_id) {
  return await Product.deleteOne({_id})
}


module.exports = {
  list,
  get,
  create,
  edit,
  destroy
}