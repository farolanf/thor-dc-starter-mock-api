const _ = require('lodash')
const yup = require('yup')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status-codes')

const config = require('config')
const { users } = require('../../db')
const checkToken = require('../middlewares/checkToken')
const { safeUser } = require('../common/helpers')

const publicRoutes = config.get('publicRoutes')

const userSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
  applicationId: yup.string().required()
})

const getToken = user => jwt.sign({ user }, config.get('jwtSecret'), { expiresIn: '1h' })

module.exports = server => {
  // check token on each request except for public routes
  server.use((req, res, next) => {
    if (publicRoutes.includes(req.originalUrl)) {
      next()
    } else {
      checkToken(req, res, next)
    }
  })

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
          res.json({ user: user.user, token: getToken(user) })
        }
      }
    }
  })

  // refresh token
  server.post('/token', (req, res) => {
    const { user } = req
    res.json({ user: user.user, token: getToken(user) })
  })
}
