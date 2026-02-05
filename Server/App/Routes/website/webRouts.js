let express= require("express")
const { userAuthRoute } = require("./userAuthRouter")
const { homeRoutes } = require("./homeRoutes")
const { cartRoutes } = require("./cartRoutes")
const { productRoutes } = require("./productRoutes")
const { orderRoutes } = require("./orderRoutes")

let webRoutes = express.Router()

webRoutes.use('/user',userAuthRoute)
webRoutes.use('/home',homeRoutes)
webRoutes.use('/cart',cartRoutes)
webRoutes.use('/product',productRoutes)
webRoutes.use('/order',orderRoutes)

module.exports={webRoutes}