const fs = require('fs').promises
const path = require('path')
const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

const productsFile = path.join(__dirname, '..', 'data', 'full-products.json')
const backupFile = path.join(__dirname, '..', 'data', 'full-products.json.bak')

describe('Products API (file-fallback)', function () {
  let createdId

  before(async function () {
    // backup original products file
    await fs.copyFile(productsFile, backupFile)
  })

  after(async function () {
    // restore original products file
    await fs.copyFile(backupFile, productsFile)
    await fs.rm(backupFile)
  })

  it('GET /products should return an array', async function () {
    const res = await request(app).get('/products')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
  })

  it('GET /products/:id should return a product', async function () {
    const resList = await request(app).get('/products')
    const first = resList.body[0]
    const id = first._id || first.id
    const res = await request(app).get(`/products/${id}`)
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('description')
  })

  it('POST /products should create a product', async function () {
    const payload = { description: 'Test create', likes: 1, urls: { regular: '', small: '', thumb: '' }, links: { self: '', html: '' }, user: { id: 'u1', first_name: 'A', username: 'a' }, tags: [] }
    const res = await request(app).post('/products').send(payload)
    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('_id')
    createdId = res.body._id || res.body.id
  })

  it('PUT /products/:id should update a product', async function () {
    const res = await request(app).put(`/products/${createdId}`).send({ likes: 999 })
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('likes')
    expect(res.body.likes).to.equal(999)
  })

  it('DELETE /products/:id should remove a product', async function () {
    const res = await request(app).delete(`/products/${createdId}`)
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('success')
    expect(res.body.success).to.equal(true)
  })
})
