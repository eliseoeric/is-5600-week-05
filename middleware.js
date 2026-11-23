function cors (req, res, next) {
  const origin = req.get('Origin')
  res.set('Access-Control-Allow-Origin', origin || '*')
  if (origin) {
    res.vary('Origin')
    res.set('Access-Control-Allow-Credentials', 'true')
  }
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With')
  if (req.method === 'OPTIONS') return res.status(204).end()
  next()
}
function notFound (req, res) { res.status(404).json({ error: 'Not Found' }) }
function handleError (err, req, res, next) {
  if (res.headersSent) return next(err)
  let status = err.status || 500
  if (['ValidationError', 'CastError', 'StrictModeError'].includes(err.name)) status = 400
  if (err.code === 11000) status = 409
  const message = status === 500 ? 'Internal Error Occurred' :
    status === 409 ? 'A record with that ID already exists' : err.message
  if (status === 500) console.error(err)
  res.status(status).json({ error: message })
}
module.exports = { cors, notFound, handleError }
