const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const authService = require('../services/auth')

const login = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const tokens = await authService.login(username, password)
        res.cookie('access_token', `Bearer ${tokens.accessToken}`, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 86400 * 1000,
        });
        return res.status(StatusCodes.OK).json({
            accessToken: tokens.accessToken
        })
    } catch (e){
        return res.status(e.code).json({
            message: e.message
        })
    }

})

const logout = ErrorWrapperHandler((req, res, next) => {
    return res.status(StatusCodes.OK).json("logout")
})

const createUser = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const username = req.body.username
        const role = req.body.role
        const branch_id = req.body.branch_id
        const name = req.body.name
        const token = req.cookies.access_token
        const message = await authService.createUser(token, username, role, branch_id, name)
        return res.status(StatusCodes.OK).json({
            message: message
        })
    } catch (e){
        return res.status(e.code).json({
            message: e.message
        })
    }
})

module.exports = {
    login,
    logout,
    createUser
}