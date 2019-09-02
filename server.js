const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const db = require('./db')
const router = jsonServer.router(db)

const PORT = process.env.PORT || 3000

server.use(middlewares)
require('./routes')(server)
server.use(router)

server.listen(PORT, () => {
  console.log(`JSON server is listening on 0.0.0.0:${PORT}`)
})