const authRouter = require("./auth")
const branchRouter = require("./branch")

module.exports = function initialRoutes(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/branch', branchRouter)
}