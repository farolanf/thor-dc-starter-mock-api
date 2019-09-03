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
})