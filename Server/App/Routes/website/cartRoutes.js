let express = require("express")
const { addToCart, cartView, deleteCart } = require("../../controllers/web/cartController")
const { checkToken } = require("../../Middleware/checkToken")

let cartRoutes = express.Router()

cartRoutes.post('/add-to-cart',checkToken, addToCart)
cartRoutes.post('/cart-data', checkToken, cartView)
cartRoutes.post('/remove-cart', checkToken, deleteCart)

module.exports = {cartRoutes}