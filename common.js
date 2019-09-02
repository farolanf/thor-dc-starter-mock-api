const httpStatus = require('http-status-codes')

exports.sendStatus = (res, status) => res.status(status).send(httpStatus.getStatusText(status))
