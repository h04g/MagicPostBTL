const { StatusCodes } = require('http-status-codes')
const { ROLE_ADMIN, ROLE_TRANSACTION_POINT_MANAGER, ROLE_TRANSACTION_POINT_STAFF, ROLE_TRANSIT_POINT_MANAGER, ROLE_TRANSIT_POINT_STAFF, IWGCNBA_1, IWGCNBA_3,
    IWGCNBA_4, IWGCNBA_5, ROLE_TRANSACTION_POINT, VAT, PRODUCT_TYPE_COMMODITY, PRODUCT_TYPE_DOCUMENT, SHIPPING_ORDERS_TRANSPORTING, SHIPPING_ORDERS_DELIVERED, SHIPPING_ORDERS_REFUNDING, SHIPPING_ORDERS_REFUNDED, ROLE_CUSTOMER } = require('../utils/constant')

const { db } = require('../models')
const { decodeToken } = require('../utils/jwt')
const { getBranchById, getBranchByRole } = require('./branch')
const { getUsersByBranchId } = require('./auth')
const { getTransportByShippingOrdersID } = require('./transport')

const createShippingOrders = async (token, sender_name, sender_address, sender_phone_number,
    receiver_name, receiver_address, receiver_phone_number, receiver_postal_id, product_type, exceptional_service, iwgcnba,
    weigh, convert_weigh, node, main_charge, surcharge, expenses_gygt, other_revenue, cod, receiver_other_revenue) => {
    const user = decodeToken(token)
    if (!user) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (sender_name == null || sender_address == null || sender_phone_number == null || receiver_name == null || receiver_address == null
        || receiver_phone_number == null || receiver_postal_id == null || product_type == null || weigh == null || convert_weigh == null
        || node == null || main_charge == null || surcharge == null || expenses_gygt == null || other_revenue == null || cod == null || receiver_other_revenue == null) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    if (!(iwgcnba && (iwgcnba == IWGCNBA_1 || iwgcnba == IWGCNBA_2 || iwgcnba == IWGCNBA_3 || iwgcnba == IWGCNBA_4 || iwgcnba == IWGCNBA_5))) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid iwgcnba'
        throw err
    }

    if (isNaN(weigh) || isNaN(convert_weigh) || isNaN(main_charge) || isNaN(surcharge) || isNaN(expenses_gygt) || isNaN(other_revenue) || isNaN(cod) || isNaN(receiver_other_revenue)
        || weigh < 0 || convert_weigh < 0 || main_charge < 0 || surcharge < 0 || expenses_gygt < 0 || other_revenue < 0 || cod < 0 || receiver_other_revenue < 0) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid number data'
        throw err
    }

    let sender_branch = await getBranchById(user.branch_id)
    if (sender_branch == null || sender_branch.role != ROLE_TRANSACTION_POINT) {
        let err = new Error()
        err.code = StatusCodes.FORBIDDEN
        err.message = 'You do not have access'
        throw err
    }

    if (!isPhoneNumber(sender_phone_number) || !isPhoneNumber(receiver_phone_number)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid phone number'
        throw err
    }

    if (product_type != PRODUCT_TYPE_COMMODITY && product_type != PRODUCT_TYPE_DOCUMENT) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid product_type'
        throw err
    }

    let receiver_branch = await getBranchById(receiver_postal_id)
    if (receiver_branch == null || receiver_branch.role != ROLE_TRANSACTION_POINT) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid receiver_postal_id'
        throw err
    }

    let vat_fee = (main_charge + surcharge + expenses_gygt) * VAT
    let total_fare = main_charge + surcharge + expenses_gygt + vat_fee + other_revenue;
    let total_revenue = cod + receiver_other_revenue;
    const t = await db.sequelize.transaction();
    try {
        let shippingOrders = await db.ShippingOrders.create({
            staff_id: user.id,
            sender_name: sender_name,
            sender_address: sender_address,
            sender_phone_number: sender_phone_number,
            sender_postal_id: user.branch_id,
            receiver_name: receiver_name,
            receiver_address: receiver_address,
            receiver_phone_number: receiver_phone_number,
            receiver_postal_id: receiver_postal_id,
            product_type: product_type,
            exceptional_service: exceptional_service,
            iwgcnba: iwgcnba,
            weigh: weigh,
            convert_weigh: convert_weigh,
            node: node,
            status: SHIPPING_ORDERS_TRANSPORTING,
            delivery_time: null,
            main_charge: main_charge,
            surcharge: surcharge,
            expenses_gygt: expenses_gygt,
            vat_fee: vat_fee,
            total_fare: total_fare,
            other_revenue: other_revenue,
            cod: cod,
            receiver_other_revenue: receiver_other_revenue,
            total_revenue: total_revenue,
        }, { transaction: t })

        let customer = await getBranchByRole(ROLE_CUSTOMER)
        if (customer[0] == null) {
            let err = new Error()
            err.code = StatusCodes.NOT_FOUND
            err.message = 'Missing branch with role = 0 for customer in database'
            throw err
        }
        await db.Transport.create({
            shipping_order_id: shippingOrders.id,
            receiving_branch_id: user.branch_id,
            receiving_time: new Date(),
            export_branch_id: customer[0].id,
            export_time: new Date(),
        }, { transaction: t })

        await t.commit();
        return {
            message: "ShippingOrders successfully created"
        }
    } catch (error) {
        await t.rollback();
        throw error
    }
}

const updateStatus = async (token, id, status) => {
    const user = decodeToken(token)
    if (user == null) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (id == null || (status != SHIPPING_ORDERS_TRANSPORTING && status != SHIPPING_ORDERS_DELIVERED
        && status != SHIPPING_ORDERS_REFUNDING && status != SHIPPING_ORDERS_REFUNDED)) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    const shippingOrder = await getShippingOrdersById(id)
    if (shippingOrder == null) {
        let err = new Error()
        err.code = StatusCodes.NOT_FOUND
        err.message = 'ShippingOrder does not exist'
        throw err
    }
    if (status <= shippingOrder.status || shippingOrder.status == SHIPPING_ORDERS_DELIVERED || shippingOrder.status == SHIPPING_ORDERS_REFUNDED) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Cannot update status'
        throw err
    }
    if (status == SHIPPING_ORDERS_REFUNDED || status == SHIPPING_ORDERS_DELIVERED) {
        if(status == SHIPPING_ORDERS_REFUNDED && shippingOrder.sender_postal_id != user.branch_id){
            let err = new Error()
            err.code = StatusCodes.BAD_REQUEST
            err.message = 'Cannot update status'
            throw err
        }
        if(status == SHIPPING_ORDERS_DELIVERED && shippingOrder.receiver_postal_id != user.branch_id){
            let err = new Error()
            err.code = StatusCodes.BAD_REQUEST
            err.message = 'Cannot update status'
            throw err
        }
        await db.ShippingOrders.update({ status: status, staff_id: user.id, delivery_time: new Date() }, {
            where: {
                id: id,
            },
        });
    } else {
        await db.ShippingOrders.update({ status: status, staff_id: user.id }, {
            where: {
                id: id,
            },
        });
    }

    return {
        message: "ShippingOrders successfully updated"
    }
}

const getShippingOrdersById = async (id) => {

    return await db.ShippingOrders.findByPk(id)
}

const getShippingOrdersByBrandhIdAndStatus = async (token, status) => {

    const user = decodeToken(token)
    if (user == null) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    if (status != SHIPPING_ORDERS_TRANSPORTING && status != SHIPPING_ORDERS_DELIVERED
        && status != SHIPPING_ORDERS_REFUNDING && status != SHIPPING_ORDERS_REFUNDED) {
        let err = new Error()
        err.code = StatusCodes.BAD_REQUEST
        err.message = 'Invalid data'
        throw err
    }

    let data = []

    if (status == SHIPPING_ORDERS_TRANSPORTING || status == SHIPPING_ORDERS_REFUNDING) {
        const staff = await getUsersByBranchId(user.branch_id)
        const staff_Id = staff.map(employee => employee.id);
        let shippingOrders = await db.ShippingOrders.findAll({
            where: {
                staff_id: staff_Id,
                status: status,
            },
            order: [
                ['updated_at', 'DESC'],
            ]
        });
        for (const shippingOrder of shippingOrders) {
            let shipments = await getTransportByShippingOrdersID(shippingOrder.id)
            if (shipments[0].receiving_branch_id == user.branch_id) {
                data.push(shippingOrder)
            }
        }
    }
    if (status == SHIPPING_ORDERS_DELIVERED) {
        data = await db.ShippingOrders.findAll({
            where: {
                receiver_postal_id: user.branch_id,
                status: status,
            },
            order: [
                ['delivery_time', 'DESC'],
            ]
        });
    }
    if (status == SHIPPING_ORDERS_REFUNDED) {
        data = await db.ShippingOrders.findAll({
            where: {
                sender_postal_id: user.branch_id,
                status: status,
            },
            order: [
                ['delivery_time', 'DESC'],
            ]
        });
    }
    return data
}

const getImportShippingOrders = async (token) => {

    const user = decodeToken(token)
    if (user == null) {
        let err = new Error()
        err.code = StatusCodes.UNAUTHORIZED
        err.message = 'Invalid token'
        throw err
    }

    const shippingOrders = await db.Transport.findAll({
        where: {
            receiving_branch_id: user.branch_id,
        },
        order: [
            ['export_time', 'DESC'],
        ]
    })
    const shippingOrdersId = shippingOrders.map(shippingOrder => shippingOrder.shipping_order_id);
    let data = await db.ShippingOrders.findAll({
        where: {
            id: shippingOrdersId,
        },
    });
    return data
}

function isPhoneNumber(input) {
    var phoneNumberPattern = /^0\d{9}$/;
    return phoneNumberPattern.test(input);
}

module.exports = {
    createShippingOrders,
    updateStatus,
    getShippingOrdersById,
    getShippingOrdersByBrandhIdAndStatus,
    getImportShippingOrders
}