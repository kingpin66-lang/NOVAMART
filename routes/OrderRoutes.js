const express = require('express')
const { getOrder, getsingleOrder, addOrder, deleteOrder, updateOrder, getAllOrders } = require('../controllers/OrderController')
const verifytoken = require('../middleware/verifytoken')
const isAdmin = require('../middleware/IsAdmin')
const router = express.Router()

router.get('/admin',verifytoken,isAdmin,getAllOrders)
router.get('/', verifytoken, getOrder)
router.get('/:id', verifytoken, getsingleOrder)
router.post('/', verifytoken, addOrder)
router.delete('/:id', verifytoken, deleteOrder)
router.put('/:id', verifytoken, isAdmin, updateOrder)

module.exports = router