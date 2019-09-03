const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const db = require('../db')
const router = jsonServer.router(db)

server.use(middlewares)
server.use(jsonServer.bodyParser)
require('./routes')(server)
server.use(router)

module.exports = server