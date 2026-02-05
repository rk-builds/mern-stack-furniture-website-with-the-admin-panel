let express = require("express")
const {  getSlider, getProductByCategory, getHomeCategory, getProductsByType, getBestSalingProduct, getCustomerReview } = require("../../controllers/web/homeController")

let homeRoutes = express.Router()

homeRoutes.get('/category',getHomeCategory)
homeRoutes.get('/product/:pid', getProductByCategory)
homeRoutes.get('/slider', getSlider)
homeRoutes.get('/homepage-product', getProductsByType)
homeRoutes.get('/bestsaling-product', getBestSalingProduct)
homeRoutes.get('/reviews', getCustomerReview)

module.exports = {homeRoutes}