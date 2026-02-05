let express = require("express")
const { productDetails } = require("../../controllers/web/singleProductController")
let productRoutes = express.Router()

productRoutes.get(`/product-details/:slug`,productDetails)

module.exports = { productRoutes }