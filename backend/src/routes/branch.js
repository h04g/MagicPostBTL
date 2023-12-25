const router = require('express').Router();
const branchController = require('../controllers/branch')

router.post('/creat', branchController.createBranch)
router.post('/update', branchController.updateBranch)
router.delete('/deleteUser', branchController.deleteBranch)
router.get('/', branchController.getBranchs)
module.exports = router