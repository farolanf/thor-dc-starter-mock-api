const _ = require('lodash')
const { orderItems, devices } = require('../../db')

// filter data by query if any
const filter = (data, query, names) => {
  const criteria = _.pick(query, names)
  if (Object.keys(criteria).length) {
    return _.filter(data, criteria)
  }
  return data
}

module.exports = server => {
  // Search devices by some criteria.
  // Filtering nested array values and nested object injected by _embed or _expand
  // is not supported by json-server, so we need to write our own.
  server.get('/locate', (req, res) => {
    let data = _.cloneDeep(orderItems)
    data = filter(data, req.query, ['orderNumber', 'itemNumber'])
    data.forEach(orderItem => {
      const query = Object.assign({}, req.query, { orderItemId: orderItem.id })
      orderItem.devices = filter(devices, query, ['orderItemId', 'model', 'deviceId', 'family', 'compartment', 'ip', 'subnet'])
      // TODO: filter by full text search: location
    })
    res.json(data)
  })
}
