module.exports = server => {
  require('./auth')(server)
  require('./error')(server)
}
