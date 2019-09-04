module.exports = server => {
  require('./auth')(server)
  require('./locate')(server)
  require('./error')(server)
}
