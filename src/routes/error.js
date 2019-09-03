const httpStatus = require('http-status-codes')

module.exports = server => {
  server.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    let status = 500
    let message
    if (err instanceof Error) {
      if (!isNaN(err.message)) {
        status = Number(err.message)
        console.log(httpStatus.getStatusText(status), err)
      } else {
        console.log(err)
      }
      message = httpStatus.getStatusText(status)
    } else {
      status = err.status
      message = err.message
    }
    res.status(status).send({
      error: true,
      status,
      message
    })
  })
}