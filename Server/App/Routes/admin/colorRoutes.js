let express = require("express")
const { colorCreate, colorView, colorUpdate, colorDelete, multiDelete, singleData, statusUpdate } = require("../../controllers/admin/colorControler")
let colorRoutes = express.Router()

colorRoutes.post("/create",colorCreate)
colorRoutes.get("/view",colorView)
colorRoutes.put("/update/:id",colorUpdate)
colorRoutes.delete("/delete/:id",colorDelete)
colorRoutes.post("/multi-delete",multiDelete)
colorRoutes.get("/edit-color/:id",singleData)
colorRoutes.post("/status-update",statusUpdate)


module.exports={colorRoutes}