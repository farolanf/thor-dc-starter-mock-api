module.exports = server => {
  require('./auth')(server)
  require('./locate')(server)
  require('./command')(server)
  require('./error')(server)
}
