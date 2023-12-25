const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const branchService = require('../services/branch')

const createBranch = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const role = req.body.role
        const address = req.body.address
        const branch = await branchService.createBranch(role, address)
        return res.status(StatusCodes.OK).json({
            data : {branch : branch}
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

const updateBranch = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.body.id
        const role = req.body.role
        const address = req.body.address
        const message = await branchService.updateBranch(id, role, address)
        return res.status(StatusCodes.OK).json({
            message: message
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

const deleteBranch = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.body.deleteBranchId
        const token = req.cookies.access_token
        const message = await branchService.deleteBranch(id);
        return res.status(StatusCodes.OK).json({
            message: message
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

const getBranchs = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const role = req.query.role
        const data = await branchService.getBranchByRole(role);
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
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchs
}