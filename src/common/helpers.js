const _ = require('lodash')

exports.bearerToken = token => `Bearer ${token}`

exports.getBearerToken = req => (req.get('Authorization') || '').replace('Bearer ', '')

exports.safeUser = user => user && _.omit(user, ['password'])

exports.login = () => {
  return request(app)
    .post('/login')
    .send({
      user: 'user1@c1.com',
      password: 'aaa123',
      applicationId: 'app1'
    })
    .then(res => res.body.token)
}
