const _ = require('lodash')
const yup = require('yup')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status-codes')

const config = require('config')
const { users } = require('../../db')
const checkToken = require('../middlewares/checkToken')
const { safeUser } = require('../common/helpers')

const userSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
  applicationId: yup.string().required()
})

const getToken = user => jwt.sign({ user }, config.get('JWT_SECRET'), { expiresIn: '1h' })

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
  server.post('/token', checkToken, (req, res) => {
    const { user } = req
    res.json({ user, token: getToken(user) })
  })
}
