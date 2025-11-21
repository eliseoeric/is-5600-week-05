/**
 * Middleware utilities
 * File (for reference): /mnt/data/110fc6e9-9324-4708-9fa3-ab9e9666e8c9.png
 */

/**
 * Set the CORS headers on the response object and handle preflight requests.
 * @param {import('http').IncomingMessage & {headers: any, method: string}} req
 * @param {import('http').ServerResponse & {setHeader: Function, status: Function, json?: Function}} res
 * @param {Function} next
 */
function cors(req, res, next) {
  const origin = req.headers && req.headers.origin;

  // If an origin is present, echo it and allow credentials.
  // If no origin (e.g. same-origin request from server-side), fall back to '*'
  // but do NOT use '*' with credentials: true (browsers will reject).
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    // Allow cookies/credentials only when a specific origin is supplied
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Do not advertise credentials if origin is not known
    res.setHeader('Access-Control-Allow-Credentials', 'false');
  }

  // Allowed methods and headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  // How long the results of a preflight request can be cached (in seconds)
  res.setHeader('Access-Control-Max-Age', '86400');

  // If this is a preflight request, respond immediately
  if (req.method && req.method.toUpperCase() === 'OPTIONS') {
    // 204 No Content is appropriate for a successful preflight
    return res.status ? res.status(204).end() : res.end();
  }

  next();
}

/**
 * Handle errors
 * @param {Error & {status?: number, statusCode?: number}} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
function handleError(err, req, res, next) {
  // Log the error with stack for server-side debugging
  console.error(err && err.stack ? err.stack : err);

  // If the response has already been sent, delegate to the default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const status = err && (err.status || err.statusCode) ? (err.status || err.statusCode) : 500;

  // Send a safe error message to the client. Avoid exposing internal stack traces.
  res.status(status).json({
    error: status === 500 ? 'Internal Error Occurred' : (err.message || 'An error occurred'),
  });
}

/**
 * Send a 404 response if no route is found
 * @param {object} req
 * @param {object} res
 * @param {Function} [next]
 */
function notFound(req, res, next) {
  // If using Express, we can optionally forward to the error handler:
  if (typeof next === 'function') {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }

  res.status(404).json({ error: 'Not Found' });
}

module.exports = {
  cors,
  handleError,
  notFound,
};
