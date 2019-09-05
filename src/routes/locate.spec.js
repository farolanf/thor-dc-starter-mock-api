const { bearerToken, login } = require('../common/helpers')

const assertLocateResponse = res => {
  expect(res).to.have.status(200)
  expect(res.body).to.have.property('totalDevices')
  expect(res.body).to.have.property('configuredCount')
  expect(res.body).to.have.property('unconfiguredCount')
  expect(res.body).to.have.property('devices')
}

describe('locate', () => {
  let token

  beforeEach(async () => {
    token = await login()
  })

  it('should have correct response', async () => {
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
        })
      })
  })

  it('filter by orderNumber and itemNumber', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and family', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const family = 'FAM3'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, family })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.family).to.equal(family)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and model', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const model = 'PXM2260'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, model })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.model).to.equal(model)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and deviceId', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const deviceId = 'c1c9'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, deviceId })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.deviceId).to.equal(deviceId)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and compartment', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const compartment = 'Mervin'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, compartment })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.compartment).to.equal(compartment)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and ip address', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const ip = '167.114.181.169'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, ip })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.ip).to.equal(ip)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and subnet', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const subnet = '255.255.240.0'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, subnet })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.subnet).to.equal(subnet)
        })
      })
  })

  it('filter by orderNumber, itemNumber, and location (text search)', async () => {
    const orderNumber = 'o1'
    const itemNumber = 'item2'
    const location = '5'
    await request(app)
      .get('/locate')
      .set('Authorization', bearerToken(token))
      .query({ orderNumber, itemNumber, location })
      .then(res => {
        assertLocateResponse(res)
        res.body.devices.forEach(d => {
          expect(d).to.have.property('orderItem')
          expect(d.orderItem.orderNumber).to.equal(orderNumber)
          expect(d.orderItem.itemNumber).to.equal(itemNumber)
          expect(d.location).to.include(location)
        })
      })
  })
})
