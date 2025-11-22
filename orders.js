async function edit(_id, change) {
  const order = await get(_id)
  Object.keys(change).forEach(key => order[key] = change[key])
  await order.save()
  return order
}

async function destroy(_id) {
  await Order.deleteOne({ _id })
}
