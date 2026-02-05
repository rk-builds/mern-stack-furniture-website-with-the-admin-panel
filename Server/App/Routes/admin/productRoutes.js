let express = require("express")
const { parentCategory, subCategory, getsubsubCategory, getColors, getMaterial, productCreate, productUpdate, ProductView, productDelete, singleproductData, statusUpdate, UserProductView } = require("../../controllers/admin/productControler")
let productRoutes = express.Router()
const multer =require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

productRoutes.post("/create",upload.fields
([
  { name: 'productImage', maxCount: 1 },
  { name: 'backImage', maxCount: 1 },
  { name: 'productGallery', maxCount: 10 }
]),productCreate)

productRoutes.get("/view",ProductView)

productRoutes.post("/update/:id",upload.fields
([
  { name: 'productImage', maxCount: 1 },
  { name: 'backImage', maxCount: 1 },
  { name: 'productGallery', maxCount: 10 }
]),productUpdate)

productRoutes.post("/multi-delete",productDelete)
productRoutes.get("/edit-product/:id",singleproductData)

//field belongs to other models
productRoutes.get("/parent-category",parentCategory)
productRoutes.get("/sub-category/:parentid",subCategory)
productRoutes.get("/sub-sub-category/:subid", getsubsubCategory)
productRoutes.get("/colors", getColors)
productRoutes.get("/material", getMaterial)
productRoutes.post("/status-update",statusUpdate)

productRoutes.post('/user-product-view',UserProductView)


module.exports={productRoutes}