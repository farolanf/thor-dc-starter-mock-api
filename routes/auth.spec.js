describe('auth', () => {

  it('/login success', () => {
    request(app)
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

  it('/login with locked user', () => {
    request(app)
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

  it('/login with invalid user', () => {
    request(app)
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
})