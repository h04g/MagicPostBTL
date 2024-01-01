const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const transportService = require('../services/transport')

const exportShippingOrders = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.query.id
        const receiving_branch_id = req.body.receiving_branch_id
        const token = req.headers.authorization.split(' ')[1];
        const data = await transportService.exportShippingOrders(token, id, receiving_branch_id)
        return res.status(StatusCodes.OK).json({
            data : data.message
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

const importShippingOrders = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.query.id
        const token = req.headers.authorization.split(' ')[1];
        const data = await transportService.importShippingOrders(token, id)
        console.log(data);
        return res.status(StatusCodes.OK).json({
            message: data.message
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
    exportShippingOrders,
    importShippingOrders
}