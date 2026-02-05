let express = require("express")
const { countryCreate, countryView, countryUpdate, countryDelete, singlecountryData, statusUpdate } = require("../../controllers/admin/countryControler")


let countryRoutes = express.Router()

countryRoutes.post("/create",countryCreate)
countryRoutes.get("/view",countryView)
countryRoutes.put("/update/:id",countryUpdate)
countryRoutes.post("/multi-delete",countryDelete)
countryRoutes.get("/edit-country/:id",singlecountryData)
countryRoutes.post("/status-update",statusUpdate)


module.exports={countryRoutes}