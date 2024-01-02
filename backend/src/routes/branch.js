const router = require('express').Router();
const branchController = require('../controllers/branch')

router.post('/create', branchController.createBranch)
router.post('/update', branchController.updateBranch)
router.delete('/deleteUser', branchController.deleteBranch)
router.get('/', branchController.getBranchs)
module.exports = router