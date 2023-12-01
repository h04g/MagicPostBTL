const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const authService = require('../services/auth')

const login = ErrorWrapperHandler(async(req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const tokens = await authService.login(username, password)
    res.cookie('access_token', `Bearer ${tokens.accessToken}`, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 86400 * 1000,
    });

    return res.status(StatusCodes.OK).json({
        message: 'Login successfully',
        // accessToken: tokens.accessToken
    })
})

module.exports = {
    login,
}