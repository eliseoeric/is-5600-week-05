
res.json(order)
}
async function editOrder(req, res, next) {
  try {
    const updatedOrder = await Orders.edit(req.params.id, req.body); // Calls the `edit` method from Orders
    res.json(updatedOrder); // Sends the updated order as JSON
  } catch (error) {
    next(error); // Passes errors to the error-handling middleware
  }
}

async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id); // Calls the `destroy` method from Orders
    res.status(204).send(); // Sends a no-content response
  } catch (error) {
    next(error); // Passes errors to the error-handling middleware
  }
}

async function listOrders (req, res, next) {
const { offset = 0, limit = 25, productId, status } = req.query
@@ -88,6 +105,7 @@ async function listOrders (req, res, next) {
res.json(orders)
}


module.exports = autoCatch({
handleRoot,
listProducts,