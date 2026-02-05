let express= require("express")  //express start no need to initialize app here
const { colorRoutes } = require("./colorRoutes")
const { materialRoutes } = require("./materialRoutes")
const { categoryRoutes } = require("./categoryRoutes")
const { subCategoryRoutes } = require("./subCaegoryRoutes")
const { subSubCategoryRoutes } = require("./subSubCategoryRoutes")
const { productRoutes } = require("./productRoutes")
const {countryRoutes} = require("./countryRoutes")
const { faqRoutes } = require("./faqRoutes")
const { whyChooseRoutes } = require("./whyChooseRoutes")
const { testRoutes } = require("./testimonialRoutes")
const { sliderRoutes } = require("./sliderRoutes")
const { adminAuthRoutes } = require("./adminAuthRoutes")



let adminRoutes = express.Router() // express have router function
adminRoutes.use("/admin-auth", adminAuthRoutes)
adminRoutes.use("/color",colorRoutes)
adminRoutes.use("/material",materialRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/subCategory",subCategoryRoutes)
adminRoutes.use("/subSubCategory",subSubCategoryRoutes)
adminRoutes.use("/product",productRoutes)
adminRoutes.use("/country",countryRoutes)
adminRoutes.use("/faq",faqRoutes)
adminRoutes.use("/whyChoose",whyChooseRoutes)
adminRoutes.use("/test",testRoutes)
adminRoutes.use("/slider",sliderRoutes)



module.exports={adminRoutes}