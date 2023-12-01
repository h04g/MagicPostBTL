const {StatusCodes} = require('http-status-codes')

const {compare} = require('../utils/bcrypt')
const { db } = require('../models')
const {generateToken} = require('../utils/jwt')

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
    login,
}