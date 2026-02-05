let express = require("express")

let sliderRoutes = express.Router()
const multer =require("multer")
const { sliderCreate, sliderView, sliderUpdate, sliderDelete, singlesliderData, statusUpdate } = require("../../controllers/admin/sliderControler")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/slider')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

// const upload = multur({dest: 'uploads/catagory'})
sliderRoutes.post("/create",upload.single('sliderImage'),sliderCreate)
sliderRoutes.get("/view",sliderView)
sliderRoutes.post("/update/:id",upload.single('sliderImage'),sliderUpdate)
sliderRoutes.post("/multi-delete",sliderDelete)
sliderRoutes.get("/edit-slider/:id",singlesliderData)
sliderRoutes.post("/status-update",statusUpdate)

module.exports={sliderRoutes}