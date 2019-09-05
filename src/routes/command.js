const _ = require('lodash')
const faker = require('faker')

const programErrors = ['A firmware update is required', 'Timed out', 'Unknown error']
const validateFirmwareErrors = ['Timed out', 'Unknown error']
const uploadConfigErrors = ['Invalid config', 'Timed out', 'Unknown error']
const rebootErrors = ['Timed out', 'Unknown error']

const maxDelayMs = process.env.NODE_ENV === 'test' ? 0 : 3000
const successChance = 70

const randomDelay = fn => setTimeout(fn, faker.random.number() % maxDelayMs)

// randomly return success or error object
const randomResponse = errors => {
  return faker.random.number() % 100 < successChance ? { success: true } : { success: false, error: _.sample(errors) }
}

module.exports = server => {
  // program a device
  server.post('/command/program', (req, res) => {
    randomDelay(() => res.send(randomResponse(programErrors)))
  })
  server.post('/command/validatefirmware', (req, res) => {
    randomDelay(() => res.send(randomResponse(validateFirmwareErrors)))
  })
  server.post('/command/uploadconfig', (req, res) => {
    randomDelay(() => res.send(randomResponse(uploadConfigErrors)))
  })
  server.post('/command/reboot', (req, res) => {
    randomDelay(() => res.send(randomResponse(rebootErrors)))
  })
}
