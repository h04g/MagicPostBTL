const { StatusCodes } = require('http-status-codes')

const { db } = require('../models')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT, ROLE_TRANSIT_POINT } = require('../utils/constant')
const { route } = require('../routes/auth')

const getBranchById = async (branch_id) => {
    return await db.Branch.findOne({
        where: { id: branch_id },
        raw: true
    })
}

const createBranch = async (role, address) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (user.role != ROLE_ADMIN) {
        let err = new Error()
        err.code = StatusCodes.FORBIDDEN
        err.message = 'You do not have access'
        throw err
    }

    if (!address || !(role == ROLE_TRANSACTION_POINT || role == ROLE_TRANSIT_POINT)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    return await db.Branch.create({
        role: role,
        address: address,
    })
}

const updateBranch = async (id, role, address) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (user.role != ROLE_ADMIN) {
        let err = new Error()
        err.code = StatusCodes.FORBIDDEN
        err.message = 'You do not have access'
        throw err
    }

    if (!id || !address || !(role == ROLE_TRANSACTION_POINT || role == ROLE_TRANSIT_POINT)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    await db.Branch.update({ role: role, address: address }, {
        where: {
            id: id,
        },
    });

    return {
        message: "Branch updated successfully."
    }
}

const deleteBranch = async (id) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (!id || !address || !(role == ROLE_TRANSACTION_POINT || role == ROLE_TRANSIT_POINT)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    if (user.role == ROLE_ADMIN) {
        await db.Branch.update({ is_unused: true }, {
            where: {
                id: id,
            },
        });

        return {
            message: "Branch deleted successfully."
        }

    }

    let err = new Error()
    err.code = StatusCodes.FORBIDDEN
    err.message = 'You do not have access'
    throw err
}

const getBranchByRole = async (role) => {

    if (!(role == ROLE_TRANSACTION_POINT || role == ROLE_TRANSIT_POINT)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    return await db.Branch.findAll({
        where: {
            role: role,
            is_unused: false,
        },
    });
}

module.exports = {
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchByRole
}