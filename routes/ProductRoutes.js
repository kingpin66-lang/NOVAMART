const express = require('express')
const { getProduct, AddProduct, UpdateProduct, DeleteProduct, getsingleProduct } = require('../controllers/ProductController')
const verifytoken = require('../middleware/verifytoken')
const isAdmin = require('../middleware/IsAdmin')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', getProduct)
router.get('/:id', getsingleProduct)
router.post('/', verifytoken, isAdmin, upload.single('image'), AddProduct)
router.put('/:id', verifytoken, isAdmin, upload.single('image'), UpdateProduct)
router.delete('/:id', verifytoken, isAdmin, DeleteProduct)

module.exports = router;