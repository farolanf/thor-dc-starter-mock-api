const _ = require('lodash')
const yup = require('yup')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status-codes')

const config = require('config')
const { users } = require('../db')
const { sendStatus } = require('../common')

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

const safeUser = user => _.omit(user, ['password'])

module.exports = server => {
  server.get('/login', (req, res) => {
    const params = _.pick(req.body, ['user', 'password', 'applicationId'])
    if (!userSchema.isValidSync(params)) {
      sendStatus(res, httpStatus.BAD_REQUEST)
    } else {
      const user = _.find(users, params)
      if (!user) {
        sendStatus(res, httpStatus.UNAUTHORIZED)
      } else {
        if (user.locked) {
          sendStatus(res, httpStatus.FORBIDDEN)
        } else {
          res.json({ user: user.user, token: getToken(safeUser(user)) })
        }
      }
    }
  })

  // refresh token
  server.post('/token', (req, res) => {
    const params = _.pick(req.body, ['user', 'token'])
    if (!tokenSchema.isValidSync(params)) {
      sendStatus(res, httpStatus.BAD_REQUEST)
    } else {
      decodeToken(params.token, (err, payload) => {
        if (err) {
          sendStatus(res, httpStatus.BAD_REQUEST)
        } else {
          const user = _.find(users, _.pick(payload.user, ['id']))
          if (!user) {
            sendStatus(res, httpStatus.UNAUTHORIZED)
          } else {
            res.json({ user: user.user, token: getToken(safeUser(user)) })
          }
        }
      })
    }
  })
}