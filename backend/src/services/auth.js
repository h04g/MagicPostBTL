const { StatusCodes } = require('http-status-codes')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT_MANAGER, ROLE_TRANSACTION_POINT_STAFF, ROLE_TRANSIT_POINT_MANAGER, ROLE_TRANSIT_POINT_STAFF } = require('../utils/constant')

const { db } = require('../models')
const { decodeToken } = require('../utils/jwt')
const { hash } = require('../utils/bcrypt')
const { getBranchById } = require('./branch')

const createUser = async (token, username, role, branch_id, name) => {
    const user = decodeToken(token);
    if (!user) {
        const err = new Error('Invalid token')
        err.code = StatusCodes.UNAUTHORIZED
        throw err
    }
    const branch = getBranchById(branch_id)
    if (!username || !role || !branch) {
        const err = new Error('Invalid data')
        err.code = StatusCodes.BAD_REQUEST
        throw err
    }
    if (user.role == ROLE_TRANSIT_POINT_STAFF || user.role == ROLE_TRANSACTION_POINT_STAFF || (user.role == ROLE_TRANSACTION_POINT_MANAGER && role == ROLE_TRANSIT_POINT_STAFF) || (user.role == ROLE_TRANSIT_POINT_MANAGER && role == ROLE_TRANSACTION_POINT_STAFF)) {
        const err = new Error('You do not have access')
        err.code = StatusCodes.FORBIDDEN
        throw err
    }
    if (getUserByUsername(username)) {
        const err = new Error('Username exists')
        err.code = StatusCodes.BAD_REQUEST
        throw err
    }

    const password = hash(username)
    await db.User.create({
        username: username,
        password: password,
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
        where: { username },
        raw: true
    })
}

const login = async (username, password) => {
    const user = await db.User.findOne({
        where: { username },
        raw: true
    })
    if (!user) {
        const err = new Error('Username or password is incorrect')
        err.code = StatusCodes.UNAUTHORIZED
        throw err
    }

    const isMatchPassword = compare(password, user.password)
    if (!isMatchPassword) {
        const err = new Error('Username or password is incorrect')
        err.code = StatusCodes.UNAUTHORIZED
        throw err
    }

    const accessToken = generateToken({
        id: user.id,
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