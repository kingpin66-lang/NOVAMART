const express = require('express')
const { getCart, addCart, updateCart, deleteCart, clearCart } = require('../controllers/CartController.')
const verifytoken = require('../middleware/verifytoken')
const router = express.Router()


router.get('/',verifytoken, getCart)
router.post('/',verifytoken, addCart)
router.put('/:id',verifytoken, updateCart)
router.delete('/:id',verifytoken, deleteCart)
router.delete('/',verifytoken, clearCart)

module.exports=router