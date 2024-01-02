const router = require('express').Router();
const branchController = require('../controllers/branch')

router.post('/create', branchController.createBranch)
router.post('/update', branchController.updateBranch)
router.delete('/delete', branchController.deleteBranch)
router.get('/', branchController.getBranchs)
module.exports = router