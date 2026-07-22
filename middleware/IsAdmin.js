let user = require('../models/User')
let isAdmin = (req, res, next) => {
    
    if (req.user.role !== "admin") {
        res.json('invalid credentidals')
    }
    next()
}
module.exports = isAdmin;