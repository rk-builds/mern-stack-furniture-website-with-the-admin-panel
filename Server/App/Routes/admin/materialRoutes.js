let express =require("express")
const { materialCreate, materialView, materialUpdate, materialDelete, singleMaterialData,statusUpdate} = require("../../controllers/admin/materialControler")
// const { statusUpdate } = require("../../controllers/admin/colorControler")
let materialRoutes = express.Router()

materialRoutes.post("/create",materialCreate)
materialRoutes.get("/view",materialView)
materialRoutes.put("/update/:id",materialUpdate)
// materialRoutes.delete("/delete/:id",)
materialRoutes.post("/multi-delete", materialDelete)
materialRoutes.get("/edit-material/:id",singleMaterialData)
materialRoutes.post("/status-update",statusUpdate)



module.exports={materialRoutes}