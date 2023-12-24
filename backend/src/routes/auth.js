const router = require('express').Router();
const authController = require('../controllers/auth')

router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/createUser', authController.createUser)
router.post('/deleteUser', authController.deleteUser)
router.get('/getUsers', authController.getUsers)
module.exports = router