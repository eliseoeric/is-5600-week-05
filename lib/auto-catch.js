// lib/auto-catch.js

/**
 * Wraps async route handlers to catch errors
 * @param {Object} handlers - Object containing route handler functions
 * @returns {Object} - Wrapped handlers
 */
module.exports = function (handlers) {
  const wrappedHandlers = {}
  
  for (const key in handlers) {
    const handler = handlers[key]
    
    if (typeof handler === 'function') {
      wrappedHandlers[key] = function (req, res, next) {
        // If it's an async function, catch any errors
        const result = handler(req, res, next)
        
        if (result && typeof result.catch === 'function') {
          result.catch(next)
        }
        
        return result
      }
    } else {
      wrappedHandlers[key] = handler
    }
  }
  
  return wrappedHandlers
}