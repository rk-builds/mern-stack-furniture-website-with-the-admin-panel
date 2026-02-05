let express = require("express")

let whyChooseRoutes = express.Router()
const multer =require("multer")
const { whyChooseCreate, whyChooseView, whyChooseUpdate, whyChooseDelete, singlewhyChooseData, statusUpdate } = require("../../controllers/admin/whyChooseControler")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/whyChoose')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

// const upload = multur({dest: 'uploads/catagory'})
whyChooseRoutes.post("/create",upload.single('whyChooseImage'),whyChooseCreate)
whyChooseRoutes.get("/view",whyChooseView)
whyChooseRoutes.post("/update/:id",upload.single('whyChooseImage'),whyChooseUpdate)
whyChooseRoutes.post("/multi-delete",whyChooseDelete)
whyChooseRoutes.get("/edit-whyChoose/:id",singlewhyChooseData)
whyChooseRoutes.post("/status-update",statusUpdate)

module.exports={whyChooseRoutes}