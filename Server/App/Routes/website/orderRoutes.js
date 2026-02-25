let express = require("express")


const { saveOrder, verifyOrder } = require("../../controllers/web/orderController")
const { checkToken } = require("../../Middleware/checkToken")

let orderRoutes = express.Router()
orderRoutes.post('/order-save',checkToken,saveOrder)
orderRoutes.post('/verify-order',checkToken,verifyOrder)
module.exports={orderRoutes}