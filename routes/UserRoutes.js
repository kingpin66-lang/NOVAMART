const express = require('express')
const { getUser, updateUser, deleteUser, getProfile, updateProfile, changePassword } = require('../controllers/UserController')
const verifytoken = require('../middleware/verifytoken')
const isAdmin = require('../middleware/IsAdmin')
const router = express.Router()

router.get('/profile', verifytoken, getProfile)
router.put('/profile', verifytoken, updateProfile)
router.put('/change-password', verifytoken, changePassword)

router.get('/', verifytoken, isAdmin, getUser)
router.put('/:id', verifytoken, isAdmin, updateUser)
router.delete('/:id', verifytoken, isAdmin, deleteUser)


module.exports = router;