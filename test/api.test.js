const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const path = require('node:path')
const { MongoMemoryServer } = require('mongodb-memory-server')
const db = require('../db')
const app = require('../app')
const importProducts = require('../script/import-products')
let mongo, server, base, dbPath
const fixture = require('../data/full-products.json')[0]
const product = { ...fixture, _id: 'test-product' }
async function request (path, method = 'GET', data) {
  const response = await fetch(base + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data)
  })
  return { status: response.status, data: response.status === 204 ? null : await response.json() }
}
before(async () => {
  dbPath = await fs.mkdtemp(path.join(process.cwd(), '.mongo-test-'))
  mongo = await MongoMemoryServer.create({ instance: { dbPath, args: ['--nounixsocket'] } })
  process.env.MONGODB_URI = mongo.getUri('lab05-test')
  await db.connectDatabase()
  server = app.listen(0)
  await new Promise(resolve => server.once('listening', resolve))
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  if (server) await new Promise(resolve => server.close(resolve))
  await db.disconnect()
  if (mongo) await mongo.stop()
  if (dbPath) await fs.rm(dbPath, { recursive: true, force: true })
})

test('product CRUD, tag filtering and pagination', async () => {
  let result = await request('/products', 'POST', product)
  assert.equal(result.status, 201)
  assert.equal(result.data._id, product._id)
  assert.equal((await request('/products/test-product')).data.likes, product.likes)
  assert.equal((await request('/products?tag=texture')).data.length, 1)
  assert.equal((await request('/products?tag=nonexistent')).data.length, 0)
  assert.equal((await request('/products?offset=1')).data.length, 0)
  assert.equal((await request('/products?limit=0')).data.length, 0)
  result = await request('/products/test-product', 'PUT', { likes: 42 })
  assert.equal(result.data.likes, 42)
  // Reconnect to verify data was stored in MongoDB rather than process memory.
  await db.disconnect()
  await db.connectDatabase()
  assert.equal((await request('/products/test-product')).data.likes, 42)
})
test('order CRUD, populated products and filters', async () => {
  let result = await request('/orders', 'POST', {
    buyerEmail: 'student@example.com', products: ['test-product']
  })
  assert.equal(result.status, 201)
  const id = result.data._id
  assert.equal(result.data.products[0]._id, 'test-product')
  assert.equal(result.data.status, 'CREATED')
  assert.equal((await request(`/orders/${id}`)).data.products[0].likes, 42)
  assert.equal((await request('/orders?productId=test-product&status=CREATED')).data.length, 1)
  assert.equal((await request('/orders?status=COMPLETED')).data.length, 0)
  assert.equal((await request('/orders?offset=1')).data.length, 0)
  result = await request(`/orders/${id}`, 'PUT', { status: 'COMPLETED' })
  assert.equal(result.data.status, 'COMPLETED')
  assert.equal((await request(`/orders/${id}`, 'PUT', { status: 'INVALID' })).status, 400)
  assert.equal((await request(`/orders/${id}`, 'DELETE')).status, 204)
  assert.equal((await request(`/orders/${id}`)).status, 404)
})
test('validation, malformed input, missing records and deletion', async () => {
  assert.equal((await request('/products', 'POST', {})).status, 400)
  assert.equal((await request('/products', 'POST', product)).status, 409)
  assert.equal((await request('/products?limit=nope')).status, 400)
  assert.equal((await request('/products?offset=-1')).status, 400)
  assert.equal((await request('/products?tag[$ne]=x')).status, 400)
  assert.equal((await request('/products/test-product', 'PUT', { _id: 'new' })).status, 400)
  assert.equal((await request('/orders', 'POST', {})).status, 400)
  for (const resource of ['products', 'orders']) {
    for (const method of ['GET', 'PUT', 'DELETE']) {
      assert.equal((await request(`/${resource}/missing`, method, method === 'PUT' ? {} : undefined)).status, 404)
    }
  }
  const malformed = await fetch(base + '/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
  assert.equal(malformed.status, 400)
  const preflight = await fetch(base + '/products', { method: 'OPTIONS' })
  assert.equal(preflight.status, 204)
  assert.equal((await request('/products/test-product', 'DELETE')).data.deletedCount, 1)
  assert.equal((await request('/products/test-product')).status, 404)
})
test('imports the complete dataset and safely skips existing products', async () => {
  assert.equal(await importProducts(), 346)
  assert.equal(await importProducts(), 0)
  assert.equal(await db.model('Product').countDocuments(), 346)
  const page = await request('/products?offset=5&limit=3')
  assert.equal(page.data.length, 3)
  const ids = page.data.map(product => product._id)
  assert.deepEqual(ids, [...ids].sort())
})
