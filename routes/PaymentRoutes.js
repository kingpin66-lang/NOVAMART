const express=require('express')
const { esewa, verifyEsewa } = require('../controllers/PaymentController')
const router=express.Router()



router.post('/esewa',esewa)
// router.get('/verify',verifyEsewa)
module.exports=router