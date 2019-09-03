const httpStatus = require('http-status-codes')

module.exports = server => {
  server.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    let status = 500
    if (!isNaN(err.message)) {
      status = Number(err.message)
      console.error(httpStatus.getStatusText(status), err)
    } else {
      console.error(err)
    }
    res.status(status).send({
      error: true,
      status,
      message: httpStatus.getStatusText(status)
    })
  })
}