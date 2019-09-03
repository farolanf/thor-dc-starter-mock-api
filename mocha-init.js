const chai = require('chai')
const chaiHttp = require('chai-http')
const createDebug = require('debug')

// suppress output during tests
// enable output by specifying env DEBUG=log,info,error
console.log = createDebug('log')
console.info = createDebug('info')
console.error = createDebug('error')

chai.use(chaiHttp)

global.expect = chai.expect
global.request = chai.request
global.app = require('./server')
