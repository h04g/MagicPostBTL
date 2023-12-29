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
    } catch (e) {
        if (e.code >= 100 && e.code < 600) {
            return res.status(e.code).json({
                message: e.message
            })
        }
        return res.status(StatusCodes.BAD_GATEWAY).json({error: e})
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
        const data = await authService.createUser(token, username, role, branch_id, name)
        return res.status(StatusCodes.OK).json({
            message: data.message
        })
    } catch (e) {
        console.log(e);
        if (e.code >= 100 && e.code < 600) {
            return res.status(e.code).json({
                message: e.message
            })
        }
        return res.status(StatusCodes.BAD_GATEWAY).json({error: e})
    }
})

const deleteUser = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const delete_user_id = req.body.deleteUserId
        const token = req.cookies.access_token
        const data = await authService.deleteUser(token, delete_user_id)
        return res.status(StatusCodes.OK).json({
            message: data.message
        })
    } catch (e) {
        if (e.code >= 100 && e.code < 600) {
            return res.status(e.code).json({
                message: e.message
            })
        }
        return res.status(StatusCodes.BAD_GATEWAY).json({})
    }
})

const getUsers = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        const data = await authService.getUsers(token)
        return res.status(StatusCodes.OK).json({
            data: data
        })
    } catch (e) {
        console.log(e);
        if (e.code >= 100 && e.code < 600) {
            return res.status(e.code).json({
                message: e.message
            })
        }
        return res.status(StatusCodes.BAD_GATEWAY).json({})
    }
})



module.exports = {
    login,
    logout,
    createUser,
    deleteUser,
    getUsers
}