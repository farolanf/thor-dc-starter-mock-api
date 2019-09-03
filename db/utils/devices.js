const _ = require('lodash')
const faker = require('faker')

const families = ['FAM1', 'FAM2', 'FAM3']
const models = ['MODEL1', 'MODEL2', 'MODEL3', 'MODEL4']

const deviceStatuses = ['unconfigured', 'configured', 'error', 'checkedOut', 'configuring']

const generateDeviceName = () => ['PXM', 'PXG'][faker.random.number() % 2] + faker.random.number() % 1000

const generateDevice = orderItemIds => () => {
  const status = deviceStatuses[faker.random.number() % (deviceStatuses.length - 1)]
  const ip = faker.internet.ip()
  const subnet = ip.substring(0, ip.lastIndexOf('.')) + '.0'
  return {
    orderItemId: orderItemIds[faker.random.number() % orderItemIds.length],
    devicePhoto: faker.image.technics(),
    deviceName: generateDeviceName(),
    deviceIssue: '',
    status,
    deviceId: faker.random.uuid().substring(0, 4),
    location: `Structure ${faker.random.number() % 10} - Compartment Name`,
    family: families[faker.random.number() % families.length],
    model: models[faker.random.number() % models.length],
    styleNumber: faker.random.number() % 100,
    configFilename: status === 'configured' ? faker.lorem.word() + faker.random.number() % 1000 + '.bin' : null,
    compartment: faker.internet.domainWord(),
    labelName: '',
    name: '',
    ctPri: faker.random.number() % 9000 + 1000,
    ctSec: faker.random.number() % 50,
    ptPri: faker.random.number() % 900 + 100,
    ptSec: faker.random.number() % 150,
    wiring: '',
    ip,
    subnet
  }
}

exports.generateDevices = (count, orderItemIds) => _.times(count, generateDevice(orderItemIds))
