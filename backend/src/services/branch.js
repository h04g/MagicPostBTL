const { StatusCodes } = require('http-status-codes')

const { db } = require('../models')

const getBranchById = async (branch_id) => {
    const branch = await db.Branch.findOne({
        where: { branch_id },
        raw: true
    })
    return branch
}

module.exports = {
    getBranchById
}