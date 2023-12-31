const { StatusCodes } = require('http-status-codes')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT_MANAGER, ROLE_TRANSACTION_POINT_STAFF, ROLE_TRANSIT_POINT_MANAGER, ROLE_TRANSIT_POINT_STAFF } = require('../utils/constant')

const { db } = require('../models')
const { decodeToken, generateToken } = require('../utils/jwt')
const { hash, compare } = require('../utils/bcrypt')
const { getBranchById } = require('./branch')

const createUser = async (token, username, role, branch_id, name) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }
    const branch = await getBranchById(branch_id)
    let checkUser = await getUserByUsername(username)
    if (username == null || checkUser != null || (role != ROLE_ADMIN && role != ROLE_TRANSACTION_POINT_MANAGER && role != ROLE_TRANSACTION_POINT_STAFF && role != ROLE_TRANSIT_POINT_MANAGER && role != ROLE_TRANSIT_POINT_STAFF )  || !branch) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }
    if (user.role == ROLE_TRANSIT_POINT_STAFF || user.role == ROLE_TRANSACTION_POINT_STAFF || (user.role == ROLE_TRANSACTION_POINT_MANAGER && role == ROLE_TRANSIT_POINT_STAFF) || (user.role == ROLE_TRANSIT_POINT_MANAGER && role == ROLE_TRANSACTION_POINT_STAFF)) {
        let err = new Error()
        err.code = StatusCodes.FORBIDDEN
        err.message = 'You do not have access'
        throw err
    }
    if (await getUserByUsername(username)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Username exists'
        throw err
    }

    await db.User.create({
        username: username,
        password: username,
        role: role,
        branch_id: branch_id,
        name: name,
        is_unused: false
    })

    return {
        message: "Account successfully created"
    }
}

const login = async (username, password) => {
    const user = await getUserByUsername(username)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Username or password is incorrect'
        throw err
    }

    if (user.is_unused) {
        let err = new Error()
        err.code = StatusCodes.BAD_GATEWAY
        err.message = 'Account is no longer in use'
        throw err
    }

    const isMatchPassword = compare(password, user.password)
    if (!isMatchPassword) {
        let err = new Error('Username or password is incorrect')
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Username or password is incorrect'
        throw err
    }

    const accessToken = generateToken({
        id: user.id,
        role: user.role,
        branch_id: user.branch_id,
        scope: []
    })

    return {
        accessToken,
        refreshToken: '',
        user
    }
}

const deleteUser = async (token, user_id) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }
    const delete_user = await getUserById(user_id)
    if (delete_user == null) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Account does not exist.'
        throw err
    }
    if (user.role == ROLE_ADMIN || (user.branch_id == delete_user.branch_id && ((user.role == ROLE_TRANSACTION_POINT_MANAGER && delete_user.role == ROLE_TRANSACTION_POINT_STAFF) || (user.role == ROLE_TRANSIT_POINT_MANAGER && delete_user.role == ROLE_TRANSIT_POINT_STAFF)))) {
        await db.User.update({ is_unused: true }, {
            where: {
                id: user_id,
            },
        });
        return {
            message: "Account deleted successfully."
        }
    }

    let err = new Error()
    err.code = StatusCodes.FORBIDDEN
    err.message = 'You do not have access'
    throw err

}

const getUsers = async (token) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (user.role == ROLE_ADMIN) {
        return await getAllUsers()
    }

    return await getUsersByBranchId(user.branch_id)
}

const getUserByUsername = async (username) => {

    return await db.User.findOne({
        where: { username: username },
        raw: true
    })
}

const getUserById = async (id) => {

    return await db.User.findByPk(id)
}


const getUsersByBranchId = async (branch_id) => {

    return await db.User.findAll({
        where: {
            branch_id: branch_id,
            is_unused: false,
        },
    })
}

const getAllUsers = async () => {

    return await db.User.findAll({
        where: {
            is_unused: false,
        },
    }, {
        order: [
            ['branch_id', 'ASC'],
        ],
    })
}

module.exports = {
    createUser,
    login,
    deleteUser,
    getUsers
}