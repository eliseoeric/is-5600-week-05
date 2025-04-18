// Example middleware
module.exports = (req, res, next) => {
    console.log(`Request made to ${req.url}`);
    next(); // Call the next middleware or route handler
  };
  