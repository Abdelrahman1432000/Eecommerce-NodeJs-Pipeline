const express = require('express')
const config = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')

const globalErrorHandler = require('./src/middleware/globalErrorHandler')

const authRouter = require('./src/router/auth.routes')
const categroyRouter = require('./src/router/category.routes')
const productRouter = require('./src/router/product.routes')
const couponRouter = require('./src/router/coupon.routes')
const cartRouter = require('./src/router/cart.routes')
const orderRouter = require('./src/router/order.routes')


config.config({
    path:'./config.env'
})

const app = express()

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{console.log("Conncted")})


app.use(authRouter);
app.use(categroyRouter);
app.use(productRouter)
app.use(couponRouter)
app.use(cartRouter)
app.use(orderRouter)

app.use(globalErrorHandler);


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))