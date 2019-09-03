
exports.bearerToken = token => `Bearer ${token}`

exports.getBearerToken = req => (req.get('Authentication') || '').replace('Bearer ', '')