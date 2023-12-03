const router = require('express').Router();
const controller = require('../controllers/auth')

router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.post('/createUser', controller.createUser)
module.exports = router