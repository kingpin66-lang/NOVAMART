const express = require('express')
const { getCategory, AddCategory, UpdateCategory, DeleteCategory } = require('../controllers/CategoryController')
const verifytoken = require('../middleware/verifytoken')
const IsAdmin = require('../middleware/IsAdmin')
const router = express.Router()

router.get('/', getCategory)
router.post('/', verifytoken, IsAdmin, AddCategory)
router.put('/:id', verifytoken, IsAdmin, UpdateCategory)
router.delete('/:id', verifytoken, IsAdmin, DeleteCategory)

module.exports = router;