module.exports = function autoCatch(handlers) {
  const wrapped = {}
  Object.keys(handlers).forEach(key => {
    const fn = handlers[key]
    wrapped[key] = function (req, res, next) {
      const promise = fn(req, res, next)
      if (promise && promise.catch) {
        promise.catch(next)
      }
    }
  })
  return wrapped
}
