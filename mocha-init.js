const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

global.expect = chai.expect
global.request = chai.request
global.app = require('./server')
