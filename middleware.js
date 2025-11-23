function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  next()
}

function notFound(req, res) {
  res.status(404).json({ error: 'Not Found' })
}

function handleError(err, req, res, next) {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}

module.exports = { cors, notFound, handleError }
