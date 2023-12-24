const { StatusCodes } = require('http-status-codes')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT_MANAGER, ROLE_TRANSACTION_POINT_STAFF, ROLE_TRANSIT_POINT_MANAGER, ROLE_TRANSIT_POINT_STAFF } = require('../utils/constant')

const { db } = require('../models')
const { decodeToken, generateToken } = require('../utils/jwt')
const { hash, compare } = require('../utils/bcrypt')
const { getBranchById } = require('./branch')

const createUser = async (token, username, role, branch_id, name) => {
    const user = decodeToken(token);
    if (!user) {
        const err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }
    const branch = await getBranchById(branch_id)
    if (!username || !role || !branch) {
        const err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }
    if (user.role == ROLE_TRANSIT_POINT_STAFF || user.role == ROLE_TRANSACTION_POINT_STAFF || (user.role == ROLE_TRANSACTION_POINT_MANAGER && role == ROLE_TRANSIT_POINT_STAFF) || (user.role == ROLE_TRANSIT_POINT_MANAGER && role == ROLE_TRANSACTION_POINT_STAFF)) {
        const err = new Error()
        err.code = StatusCodes.FORBIDDEN
        err.message = 'You do not have access'
        throw err
    }
    if (await getUserByUsername(username)) {
        const err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Username exists'
        throw err
    }

    await db.User.create({
        username: username,
        password: username,
        role: role,
        branch_id: branch_id,
        name: name
    });

    return {
        message: "Account successfully created"
    }
}

const getUserByUsername = async (username) => {

    return await db.User.findOne({
        where: { username: username },
        raw: true
    })
}

const login = async (username, password) => {
    const user = await db.User.findOne({
        where: { username: username },
        raw: true
    })
    if (!user) {
        const err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err. message = 'Username or password is incorrect'
        throw err
    }

    const isMatchPassword = compare(password, user.password)
    if (!isMatchPassword) {
        const err = new Error('Username or password is incorrect')
        err.code = StatusCodes.UNAUTHORIZED
        err. message = 'Username or password is incorrect'
        throw err
    }

    const accessToken = generateToken({
        id: user.id,
        role: user.role,
        scope: []
    })

    return {
        accessToken,
        refreshToken: '',
    }
}



module.exports = {
    createUser,
    login,
}