const _ = require('lodash')
const yup = require('yup')
const httpStatus = require('http-status-codes')
const { users } = require('../db')

const userSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
  applicationId: yup.string().required()
})

module.exports = server => {
  server.get('/login', (req, res) => {
    const params = _.pick(req.body, ['user', 'password', 'applicationId'])
    if (!userSchema.isValidSync(params)) {
      res.status(httpStatus.BAD_REQUEST).send(httpStatus.getStatusText(httpStatus.BAD_REQUEST))
    } else {
      const user = _.find(users, params)
      if (!user) {
        res.status(httpStatus.UNAUTHORIZED).send(httpStatus.getStatusText(httpStatus.UNAUTHORIZED))
      } else {
        if (user.locked) {
          res.status(httpStatus.FORBIDDEN).send(httpStatus.getStatusText(httpStatus.FORBIDDEN))
        } else {
          res.json(user)
        }
      }
    }
  })
}