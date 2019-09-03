const _ = require('lodash')

exports.bearerToken = token => `Bearer ${token}`

exports.getBearerToken = req => (req.get('Authorization') || '').replace('Bearer ', '')

exports.safeUser = user => user && _.omit(user, ['password'])
