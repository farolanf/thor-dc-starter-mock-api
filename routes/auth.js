module.exports = server => {
  server.get('/auth', (req, res) => {
    res.json({ token: 333 })
  })
}