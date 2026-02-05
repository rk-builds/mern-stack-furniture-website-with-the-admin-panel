let express = require("express")
const { subCategoryCreate,subCategoryView, parentCategory, singlesubCategoryData, subCategoryUpdate, subCategoryDelete, statusUpdate } = require("../../controllers/admin/subCategoryControler")
let subCategoryRoutes = express.Router()
const multer =require("multer")



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subCategory')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

// const upload = multur({dest: 'uploads/catagory'})
subCategoryRoutes.post("/create",upload.single('subCategoryImage'),subCategoryCreate)
subCategoryRoutes.get("/view",subCategoryView)
subCategoryRoutes.get("/parent-category",parentCategory)
subCategoryRoutes.post("/update/:id",upload.single('subCategoryImage'),subCategoryUpdate)
subCategoryRoutes.post("/multi-delete",subCategoryDelete)
subCategoryRoutes.get("/edit-subCategory/:id",upload.single('subCategoryImage'),singlesubCategoryData)
subCategoryRoutes.post("/status-update",statusUpdate)


module.exports={subCategoryRoutes}