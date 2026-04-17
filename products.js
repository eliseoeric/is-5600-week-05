const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

/* ---------------- LIST ---------------- */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
    .filter(product => {
      if (!tag) return true
      return product.tags?.find(t => t.title === tag)
    })
    .slice(offset, offset + limit)
}

/* ---------------- GET ONE ---------------- */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile))
  return products.find(p => p.id === id) || null
}

/* ---------------- CREATE ---------------- */
async function create(product) {
  const products = JSON.parse(await fs.readFile(productsFile))

  const newProduct = {
    id: Date.now().toString(),
    ...product
  }

  products.push(newProduct)

  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
  return newProduct
}

/* ---------------- UPDATE ---------------- */
async function update(id, data) {
  const products = JSON.parse(await fs.readFile(productsFile))

  const index = products.findIndex(p => p.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...data }

  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
  return products[index]
}

/* ---------------- DELETE ---------------- */
async function remove(id) {
  const products = JSON.parse(await fs.readFile(productsFile))

  const filtered = products.filter(p => p.id !== id)

  if (filtered.length === products.length) return false

  await fs.writeFile(productsFile, JSON.stringify(filtered, null, 2))
  return true
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
}