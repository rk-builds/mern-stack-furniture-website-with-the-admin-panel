let express = require("express")
const { subSubCategoryCreate,subSubCategoryView, parentCategory, singlesubSubCategoryData, subSubCategoryUpdate, subSubCategoryDelete, subCategory, statusUpdate } = require("../../controllers/admin/subSubCategoryControler")
let subSubCategoryRoutes = express.Router()
const multer =require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/subSubCategory')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

// const upload = multur({dest: 'uploads/catagory'})
subSubCategoryRoutes.post("/create",upload.single('subSubCategoryImage'),subSubCategoryCreate)
subSubCategoryRoutes.get("/view",subSubCategoryView)
subSubCategoryRoutes.get("/parent-category",parentCategory)
subSubCategoryRoutes.get("/sub-category/:parentid",subCategory)
subSubCategoryRoutes.post("/update/:id",upload.single('subSubCategoryImage'),subSubCategoryUpdate)
subSubCategoryRoutes.post("/multi-delete",subSubCategoryDelete)
subSubCategoryRoutes.get("/edit-subSubCategory/:id",singlesubSubCategoryData)
subSubCategoryRoutes.post("/status-update",statusUpdate)


module.exports={subSubCategoryRoutes}