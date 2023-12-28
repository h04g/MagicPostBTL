const router = require('express').Router();
const shippingOrdersController = require('../controllers/shippingOrders')

router.post('/create', shippingOrdersController.createShippingOrders)
router.post('/updateStatus', shippingOrdersController.updateStatus)
router.get('/', shippingOrdersController.getShippingOrdersById)
module.exports = router