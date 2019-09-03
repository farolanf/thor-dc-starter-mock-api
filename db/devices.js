const { generateDevices } = require('./utils/devices')

// generate devices and assign to orderItems
module.exports = generateDevices(30, [1, 2, 3])
