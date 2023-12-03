const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const authService = require('../services/auth')

const login = ErrorWrapperHandler((req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const tokens = authService.login(username, password)
    res.cookie('access_token', `Bearer ${tokens.accessToken}`, {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 86400 * 1000,
    });
    return res.status(StatusCodes.OK).json({
        accessToken: tokens.accessToken
    })
})

const logout = ErrorWrapperHandler((req, res, next) => {
    return res.status(StatusCodes.OK).json("logout")
})

const createUser = ErrorWrapperHandler((req, res, next) => {
    const username = req.body.username
    const role = req.body.role
    const branch_id = req.body.role
    const name = rew.body.name
    const token = req.cookie.access_token
    const message = authService.createUser(token, username, role, branch_id, name)
    return res.status(StatusCodes.OK).json({
        message: message
    })
})

module.exports = {
    login,
    logout,
    createUser
}