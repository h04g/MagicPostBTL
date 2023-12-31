const router = require('express').Router();
const shippingOrdersController = require('../controllers/shippingOrders')
const transportController = require('../controllers/transport')

router.post('/create', shippingOrdersController.createShippingOrders)
router.post('/updateStatus', shippingOrdersController.updateStatus)
router.post('/export', transportController.exportShippingOrders)
router.post('/import', transportController.importShippingOrders)
router.get('/', shippingOrdersController.getShippingOrdersById)
module.exports = router