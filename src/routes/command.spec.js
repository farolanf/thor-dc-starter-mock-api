const { bearerToken } = require('../common/helpers')

let token

const login = async () => {
  await request(app)
    .post('/login')
    .send({
      user: 'user1@c1.com',
      password: 'aaa123',
      applicationId: 'app1'
    })
    .then(res => {
      token = res.body.token
    })
}

const expectSuccessOrError = res => {
  expect(res).to.have.status(200)
  expect(res.body).to.have.property('success')
  if (!res.body.success) {
    expect(res.body).to.have.property('error')
  }
}

describe('command', () => {
  beforeEach(login)

  it('/command/program responded with success or error', async () => {
    await request(app)
      .post('/command/program')
      .set('Authorization', bearerToken(token))
      .then(expectSuccessOrError)
  })

  it('/command/validatefirmware responded with success or error', async () => {
    await request(app)
      .post('/command/validatefirmware')
      .set('Authorization', bearerToken(token))
      .then(expectSuccessOrError)
  })

  it('/command/uploadconfig responded with success or error', async () => {
    await request(app)
      .post('/command/uploadconfig')
      .set('Authorization', bearerToken(token))
      .then(expectSuccessOrError)
  })

  it('/command/reboot responded with success or error', async () => {
    await request(app)
      .post('/command/reboot')
      .set('Authorization', bearerToken(token))
      .then(expectSuccessOrError)
  })
})
