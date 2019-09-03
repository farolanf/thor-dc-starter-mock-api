module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'mySecret',
  publicRoutes: ['/login']
}
