let express = require("express")
const { faqCreate, faqView, faqUpdate, faqDelete, singlefaqData, statusUpdate} = require("../../controllers/admin/faqControler")


let faqRoutes = express.Router()

faqRoutes.post("/create",faqCreate)
faqRoutes.get("/view",faqView)
faqRoutes.put("/update/:id",faqUpdate)
faqRoutes.post("/multi-delete",faqDelete)
faqRoutes.get("/edit-faq/:id",singlefaqData)
faqRoutes.post("/status-update",statusUpdate)


module.exports={faqRoutes}