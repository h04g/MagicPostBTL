const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const branchService = require('../services/branch')

const createBranch = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const role = req.body.role
        const address = req.body.address
        const token = req.headers.authorization.split(' ')[1];
        const branch = await branchService.createBranch(token, role, address)
        return res.status(StatusCodes.OK).json({
            data : {branch : branch}
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

const updateBranch = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.body.id
        const role = req.body.role
        const address = req.body.address
        const token = req.headers.authorization.split(' ')[1];
        const data = await branchService.updateBranch(token, id, role, address)
        return res.status(StatusCodes.OK).json({
            message: data.message
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

const deleteBranch = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.query.id
        const token = req.headers.authorization.split(' ')[1];
        const data = await branchService.deleteBranch(token, id);
        return res.status(StatusCodes.OK).json({
            message: data.message
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
        return res.status(StatusCodes.BAD_GATEWAY).json({error: e})
    }
})

module.exports = {
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchs
}