const longExpiryToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyIjoidXNlcjFAYzEuY29tIiwiYXBwbGljYXRpb25JZCI6ImFwcDEifSwiaWF0IjoxNTY3NDczNjMwLCJleHAiOjI1Njc0NzcyMzB9.eBZFPWCgOghyT0rnyPlqwvS9fWiKk3b4lelil-lPb0I'
const invalidUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjotMSwidXNlciI6InVzZXIxQGMxLmNvbSIsImFwcGxpY2F0aW9uSWQiOiJhcHAxIn0sImlhdCI6MTU2NzQ2NDc0MSwiZXhwIjoyNTY3NDY4MzQxfQ.aopyQsMJaFa00S5qXfv5yeg8_0Fo3ABj6o1NUHvFH8o'
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyIjoidXNlcjFAYzEuY29tIiwiYXBwbGljYXRpb25JZCI6ImFwcDEifSwiaWF0IjoxNTY3NDc2NDM3LCJleHAiOjE1Njc0ODAwMzd9.5-VEvkcvFmOSd-TZYq5isabbY5yNeiqPzm8go7syyfs'

describe('auth', () => {

  describe('/login', () => {

    it('login success', async () => {
      await request(app)
        .post('/login')
        .send({
          user: 'user1@c1.com',
          password: 'aaa123',
          applicationId: 'app1'
        })
        .then(res => {
          expect(res).to.have.status(200)
        })
    })

    it('login with locked user', async () => {
      await request(app)
        .post('/login')
        .send({
          user: 'user3@c3.com',
          password: 'ccc123',
          applicationId: 'app3'
        })
        .then(res => {
          expect(res).to.have.status(403)
        })
    })

    it('login with invalid user', async () => {
      await request(app)
        .post('/login')
        .send({
          user: 'invaliduser@foo.com',
          password: 'aaa123',
          applicationId: 'app1'
        })
        .then(res => {
          expect(res).to.have.status(401)
        })
    })

    it('login with missing data', async () => {
      await request(app)
        .post('/login')
        .send({
          user: 'user1@c1.com',
          applicationId: 'app1'
        })
        .then(res => {
          expect(res).to.have.status(400)
        })
    })
  })

  describe('/token', () => {

    it('refresh token success', async () => {
      await request(app)
        .post('/token')
        .send({
          user: 'user1@c1.com',
          token: longExpiryToken
        })
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('user')
          expect(res.body).to.have.property('token')
        })
    })

    it('refresh token with invalid token', async () => {
      await request(app)
        .post('/token')
        .send({
          user: 'user1@c1.com',
          token: 'invalid_token'
        })
        .then(res => {
          expect(res).to.have.status(400)
        })
    })

    it('refresh token with invalid user in payload', async () => {
      await request(app)
        .post('/token')
        .send({
          user: 'user1@c1.com',
          token: invalidUserToken
        })
        .then(res => {
          expect(res).to.have.status(401)
        })
    })

    it('refresh token with expired token', async () => {
      await request(app)
        .post('/token')
        .send({
          user: 'user1@c1.com',
          token: expiredToken 
        })
        .then(res => {
          expect(res).to.have.status(400)
        })
    })
  })
})