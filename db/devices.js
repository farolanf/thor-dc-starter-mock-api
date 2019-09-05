const { generateDevices } = require('./utils/devices')
const orderItems = require('./orderItems')

const orderItemIds = orderItems.map(o => o.id)

// generate devices and assign to orderItems
module.exports = generateDevices(50, orderItemIds)
