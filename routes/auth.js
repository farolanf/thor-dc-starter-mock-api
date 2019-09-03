const _ = require('lodash')
const yup = require('yup')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status-codes')

const config = require('config')
const { users } = require('../db')
const { getBearerToken } = require('../common')

const userSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
  applicationId: yup.string().required()
})

const tokenSchema = yup.object().shape({
  user: yup.string().required(),
  token: yup.string().required()
})

const getToken = user => jwt.sign({ user }, config.get('JWT_SECRET'), { expiresIn: '1h' })

const decodeToken = (token, cb) => jwt.verify(token, config.get('JWT_SECRET'), cb)

const safeUser = user => user && _.omit(user, ['password'])

module.exports = server => {
  server.post('/login', (req, res) => {
    const params = _.pick(req.body, ['user', 'password', 'applicationId'])
    if (!userSchema.isValidSync(params)) {
      throw new Error(httpStatus.BAD_REQUEST)
    } else {
      const user = safeUser(_.find(users, params))
      if (!user) {
        throw Error(httpStatus.UNAUTHORIZED)
      } else {
        if (user.locked) {
          throw Error(httpStatus.FORBIDDEN)
        } else {
          res.json({ user, token: getToken(user) })
        }
      }
    }
  })

  // refresh token
  server.post('/token', (req, res) => {
    const token = getBearerToken(req)
    if (!token) {
      throw Error(httpStatus.BAD_REQUEST)
    } else {
      decodeToken(token, (err, payload) => {
        if (err) {
          throw Error(httpStatus.BAD_REQUEST)
        } else {
          const user = safeUser(_.find(users, _.pick(payload.user, ['id'])))
          if (!user) {
            throw Error(httpStatus.UNAUTHORIZED)
          } else {
            res.json({ user, token: getToken(user) })
          }
        }
      })
    }
  })
}