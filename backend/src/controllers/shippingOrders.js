const { StatusCodes } = require('http-status-codes')
const ErrorWrapperHandler = require('../errors/handler')
const shippingOrdersService = require('../services/shippingOrders')

const createShippingOrders = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const sender_name = req.body.sender_name
        const sender_address = req.body.sender_address
        const sender_phone_number = req.body.sender_phone_number
        const receiver_name = req.body.receiver_name
        const receiver_address = req.body.receiver_address
        const receiver_phone_number = req.body.receiver_phone_number
        const receiver_postal_id = req.body.receiver_postal_id
        const product_type = req.body.product_type
        const exceptional_service = req.body.exceptional_service
        const iwgcnba = req.body.iwgcnba
        const weigh = req.body.weigh
        const convert_weigh = req.body.convert_weigh
        const node = req.body.node
        const main_charge = req.body.main_charge
        const surcharge = req.body.surcharge
        const expenses_gygt = req.body.expenses_gygt
        const other_revenue = req.body.other_revenue
        const cod = req.body.cod
        const receiver_other_revenue = req.body.receiver_other_revenue
        const token = req.headers.authorization.split(' ')[1];

        const data = await shippingOrdersService.createShippingOrders(token, sender_name, sender_address, sender_phone_number, 
            receiver_name, receiver_address, receiver_phone_number, receiver_postal_id, product_type, exceptional_service, iwgcnba, 
            weigh, convert_weigh, node, main_charge, surcharge, expenses_gygt, other_revenue, cod, receiver_other_revenue)
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

const updateStatus = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.query.id
        const status = req.body.status
        const token = req.headers.authorization.split(' ')[1];
        const data = await shippingOrdersService.updateStatus(token, id, status)
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

const getShippingOrders = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const id = req.query.id
        const status =  req.query.status
        const token = req.headers.authorization.split(' ')[1];
        let data
        if( id != null){
            const data = await shippingOrdersService.getShippingOrdersById(id)
        } else
        if( status != null){
        data = await shippingOrdersService.getShippingOrdersByBrandhIdAndStatus(token, status)
        }
        
        return res.status(StatusCodes.OK).json({
            data: data
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

const getImportShippingOrders = ErrorWrapperHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let data = await shippingOrdersService.getImportShippingOrders(token)
        return res.status(StatusCodes.OK).json({
            data: data
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

module.exports = {
    createShippingOrders,
    updateStatus,
    getShippingOrders,
    getImportShippingOrders
}