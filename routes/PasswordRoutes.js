const express = require('express');
const { forgotPassword } = require('../controllers/ForgotpasswordController');
const { resetPassword } = require('../controllers/ResetPasswordController');
const router=express.Router()

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);
module.exports=router