const authRouter = require("./auth")

module.exports = function initialRoutes(app) {
    app.use('/api/auth', authRouter)
}