const faker = require('faker')

// generate same data between runs
faker.seed(123)

module.exports = {
  users: require('./users'),
  orderItems: require('./orderItems'),
  devices: require('./devices')
}
