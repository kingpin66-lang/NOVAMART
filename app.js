const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())


let CategoryRoutes = require('./routes/CategoryRoutes')
let ProductRoutes = require('./routes/ProductRoutes')
let AuthRoutes = require('./routes/AuthRoutes')
let UserRoutes = require('./routes/UserRoutes')
let CartRoutes = require('./routes/CartRoutes')
let OrderRoutes = require('./routes/OrderRoutes')
let PaymentRoutes = require('./routes/PaymentRoutes')
let PasswordRoutes = require('./routes/PasswordRoutes')

app.use('/categories', CategoryRoutes)
app.use('/products', ProductRoutes)
app.use('/auth', AuthRoutes)
app.use('/user', UserRoutes)
app.use('/cart', CartRoutes)
app.use('/order', OrderRoutes)
app.use('/payment', PaymentRoutes)
app.use('/user', PasswordRoutes)

module.exports = app;