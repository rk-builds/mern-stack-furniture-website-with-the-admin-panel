let express = require("express")
const { categoryCreate,categoryView, singlecategoryData, categoryDelete, categoryUpdate, statusUpdate } = require("../../controllers/admin/categoryControler")
let categoryRoutes = express.Router()
const multer =require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

// const upload = multur({dest: 'uploads/catagory'})
categoryRoutes.post("/create",upload.single('categoryImage'),categoryCreate)
categoryRoutes.get("/view",categoryView)
categoryRoutes.post("/update/:id",upload.single('categoryImage'),categoryUpdate)
categoryRoutes.post("/multi-delete",categoryDelete)
categoryRoutes.get("/edit-category/:id",singlecategoryData)
categoryRoutes.post("/status-update",statusUpdate)

module.exports={categoryRoutes}