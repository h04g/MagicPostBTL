const { StatusCodes } = require('http-status-codes')

const { db } = require('../models')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT, ROLE_TRANSIT_POINT, ROLE_CUSTOMER, ROLE_HEADQUARTERS } = require('../utils/constant')
const { decodeToken} = require('../utils/jwt')

const getBranchById = async (branch_id) => {
    return await db.Branch.findOne({
        where: { id: branch_id },
        raw: true
    })
}

const createBranch = async (token, role, address) => {
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

    if (address == null || !(role == ROLE_TRANSACTION_POINT || role == ROLE_TRANSIT_POINT)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    return await db.Branch.create({
        role: role,
        address: address,
        is_unused: false
    })
}

const updateBranch = async (token, id, role, address) => {
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

    let branch = getBranchById(id)
    if (id == null || branch == null || address == null) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    if (user.role == ROLE_ADMIN) {
        await db.Branch.update({ role: role, address: address }, {
            where: {
                id: id,
            },
        });

        return {
            message: "Branch updated successfully."
        }
    }

    let err = new Error()
    err.code = StatusCodes.FORBIDDEN
    err.message = 'You do not have access'
    throw err
}

const deleteBranch = async (token, id) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    let branch = getBranchById(id)
    if (id == null || branch == null || address == null) {
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

    if (!(role == ROLE_TRANSACTION_POINT || role == ROLE_TRANSIT_POINT || role == ROLE_CUSTOMER || role == ROLE_HEADQUARTERS)) {
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