const express = require('express')
const path = require('path')
const api = require('./api')
const db = require('./db')
const middleware = require('./middleware')
const app = express()

app.use(middleware.cors)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
for (const resource of ['Product', 'Order']) {
  const route = '/' + resource.toLowerCase() + 's'
  app.get(route, api['list' + resource + 's'])
  app.post(route, api['create' + resource])
  app.get(route + '/:id', api['get' + resource])
  app.put(route + '/:id', api['edit' + resource])
  app.delete(route + '/:id', api['delete' + resource])
}
app.use(middleware.notFound)
app.use(middleware.handleError)

if (require.main === module) {
  db.connectDatabase().then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  }).catch(async () => {
    console.error('MongoDB connection failed. Check the database service and MONGODB_URI.')
    await db.disconnect()
    process.exitCode = 1
  })
}
module.exports = app
