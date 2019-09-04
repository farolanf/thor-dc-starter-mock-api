const _ = require('lodash')
const { orderItems, devices } = require('../../db')

// filter data by query if any
const filter = (data, query) => {
  if (Object.keys(query).length) {
    return _.filter(data, query)
  }
  return data
}

// check if obj contains properties that matched all patterns in regex
const searchObj = (obj, regex) => {
  const matchNeed = Object.keys(regex).length
  let matchCount = 0
  _.forOwn(obj, (val, field) => {
    if (_.isString(val)) {
      _.forOwn(regex, (re, param) => {
        if (field === param && val.match(re)) {
          matchCount++
          if (matchCount === matchNeed) return false
        }
      })
      if (matchCount === matchNeed) return false
    }
  })
  return matchCount === matchNeed
}

// filter by full text search
const search = (data, query) => {
  if (Object.keys(query).length) {
    const regex = _.mapValues(query, str => new RegExp(str, 'i'))
    return _.filter(data, obj => searchObj(obj, regex))
  }
  return data
}

module.exports = server => {
  // Search devices by some criteria.
  // Filtering nested array values and nested object injected by _embed or _expand
  // is not supported by json-server, so we need to write our own.
  server.get('/locate', (req, res) => {
    let data = _.cloneDeep(orderItems)
    // filter orderItems
    data = filter(data, _.pick(req.query, ['orderNumber', 'itemNumber']))
    data.forEach(orderItem => {
      const query = Object.assign({}, req.query, { orderItemId: orderItem.id })
      // filter devices by full match params
      orderItem.devices = filter(devices, _.pick(query, ['orderItemId', 'model', 'deviceId', 'family', 'compartment', 'ip', 'subnet']))
      // filter devices by full text search
      orderItem.devices = search(orderItem.devices, _.pick(req.query, ['location']))
    })
    res.json(data)
  })
}
