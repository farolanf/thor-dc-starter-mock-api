const _ = require('lodash')
const faker = require('faker')

const families = ['FAM1', 'FAM2', 'FAM3']
const models = ['PXM2260', 'PXG900']
const deviceStatuses = ['Configured', 'Unconfigured', 'CheckOut', 'Issue']
const issues = ['Device offline', 'Timed out', 'A firmware update is required', 'Unknown error']
const compartments = _.times(5, () => _.upperFirst(faker.internet.domainWord()))

const sample = arr => arr[faker.random.number() % arr.length]

const generateDevice = orderItemIds => () => {
  const status = sample(deviceStatuses)
  return {
    orderItemId: sample(orderItemIds),
    deviceId: faker.random.uuid().substring(0, 4),
    devicePhoto: faker.image.technics(),
    deviceIssue: status === 'Issue' ? sample(issues) : '',
    status,
    location: `Structure ${faker.random.number() % 10} - Compartment Name`,
    compartment: sample(compartments),
    family: sample(families),
    model: sample(models),
    styleNumber: faker.random.number() % 100,
    configFilename: status === 'Configured' || status === 'CheckOut' ? faker.lorem.word() + faker.random.number() % 1000 + '.xml' : null,
    labelName: faker.internet.domainWord().substring(0, 2).toUpperCase() + 'Label.pdf',
    name: _.upperFirst(faker.internet.domainWord()),
    ctPri: faker.random.number() % 9000 + 1000,
    ctSec: faker.random.number() % 50,
    ptPri: faker.random.number() % 900 + 100,
    ptSec: faker.random.number() % 150,
    wiring: `${faker.random.number() % 3 + 1}-phase, ${faker.random.number() % 3 + 1}-wire`,
    ip: faker.internet.ip(),
    subnet: '255.255.255.0'
  }
}

exports.generateDevices = (count, orderItemIds) => _.times(count, generateDevice(orderItemIds))
