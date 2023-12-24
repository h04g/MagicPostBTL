const { StatusCodes } = require('http-status-codes')

const { db } = require('../models')

const getBranchById = async (branch_id) => {
    return await db.Branch.findOne({
        where: { id: branch_id },
        raw: true
    })
}

module.exports = {
    getBranchById
}