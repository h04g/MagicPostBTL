const authRouter = require("./auth")
const branchRouter = require("./branch")
const shippingOrdersRouter = require("./shippingOrders")

module.exports = function initialRoutes(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/branch', branchRouter)
    app.use('/api/shippingOrders', shippingOrdersRouter)
}