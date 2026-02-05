let express = require("express")


const { saveOrder } = require("../../controllers/web/orderController")
const { checkToken } = require("../../Middleware/checkToken")

let orderRoutes = express.Router()
orderRoutes.post('/order-save',checkToken,saveOrder)
module.exports={orderRoutes}