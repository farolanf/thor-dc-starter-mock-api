const server = require('./server')

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`JSON server is listening on 0.0.0.0:${PORT}`)
})