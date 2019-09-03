const _ = require('lodash')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status-codes')

const config = require('config')
const { users } = require('../../db')
const { getBearerToken, safeUser } = require('../common/helpers')

const decodeToken = (token, cb) => jwt.verify(token, config.get('JWT_SECRET'), cb)

module.exports = (req, res, next) => {
  const token = getBearerToken(req)
  if (!token) throw Error(httpStatus.BAD_REQUEST)
  decodeToken(token, (err, payload) => {
    if (err) throw Error(httpStatus.BAD_REQUEST)
    const user = safeUser(_.find(users, _.pick(payload.user, ['id'])))
    if (!user) throw Error(httpStatus.UNAUTHORIZED)
    req.user = user
    next()
  })
}
