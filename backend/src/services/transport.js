const { StatusCodes } = require('http-status-codes')

const { db } = require('../models')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT, ROLE_TRANSIT_POINT, ROLE_CUSTOMER, ROLE_HEADQUARTERS } = require('../utils/constant')
const { getShippingOrdersById } = require('./shippingOrders')
const { decodeToken } = require('../utils/jwt')
const { getBranchById } = require('./branch')

const exportShippingOrders = async (token, id, receiving_branch_id) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    const shippingOrder = await getShippingOrdersById(id)
    if (shippingOrder == null) {
        let err = new Error()
        err.code = StatusCodes.NOT_FOUND
        err.message = 'ShippingOrder does not exist'
        throw err
    }

    let receiving_branch = getBranchById(receiving_branch_id)
    if (id == null || receiving_branch == null) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    let transports = await getTransportByShippingOrdersID(id)
    if (transports[0] == null || transports[0].receiving_time == null || transports[0].receiving_branch_id != user.branch_id) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'You do not have access'
        throw err
    }

    const t = await db.sequelize.transaction();
    try {

        await db.Transport.destroy({
            where: {
                shipping_order_id: id
            },
        })
        
        await db.Transport.create({
            shipping_order_id: id,
            receiving_branch_id: receiving_branch_id,
            export_branch_id: user.branch_id,
            export_time: new Date(),
        })

        await db.ShippingOrders.update({ staff_id: user.id }, {
            where: {
                id: id,
            },
        });

        await t.commit();
        return {
            message: "exportShippingOrders successfully"
        }
    } catch (error) {
        await t.rollback();
        throw error
    }
}

const importShippingOrders = async (token, id) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    const shippingOrder = await getShippingOrdersById(id)
    if (shippingOrder == null) {
        let err = new Error()
        err.code = StatusCodes.NOT_FOUND
        err.message = 'ShippingOrder does not exist'
        throw err
    }

    let transports = await getTransportByShippingOrdersID(id)
    if (transports[0].receiving_time != null || transports[0].receiving_branch_id != user.branch_id) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'You do not have access'
        throw err
    }
    const t = await db.sequelize.transaction();
    try {
        await db.Transport.update({ receiving_time: new Date() }, {
            where: {
                id: transports[0].id,
            },
        });

        await db.ShippingOrders.update({ staff_id: user.id }, {
            where: {
                id: id,
            },
        });

        await t.commit();
        return {
            message: "importShippingOrders successfully"
        }
    } catch (error) {
        await t.rollback();
        throw error
    }
}

const getTransportByShippingOrdersID = async (id) => {
    return await db.Transport.findAll({
        where: {
            shipping_order_id: id,
        },
        order: [
            ['export_time', 'DESC'],
        ]
    });
}

module.exports = {
    exportShippingOrders,
    importShippingOrders,
    getTransportByShippingOrdersID
}