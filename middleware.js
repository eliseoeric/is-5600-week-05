/**
 * Set the CORS headers on the response object
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function cors(req, res, next) {
  const origin = req.headers.origin;

  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');  // Cache preflight response for 24 hours
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  // If the method is OPTIONS, no further processing is needed, just return 200
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
}

/**
 * Handle errors
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function handleError(err, req, res, next) {
  // Log the error to our server's console for debugging
  console.error(err);

  // If the response has already been sent, we can't send another response
  if (res.headersSent) {
    return next(err);
  }

  // Check if the error has a status code (for example, validation errors)
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Error Occurred';

  // Send a generic 500 error response if no specific status is found
  res.status(statusCode).json({ error: message });
}

/**
 * Send a 404 response if no route is found
 * @param {object} req
 * @param {object} res
 */
function notFound(req, res) {
  res.status(404).json({ error: "Not Found" });
}

module.exports = {
  cors,
  handleError,
  notFound
};
