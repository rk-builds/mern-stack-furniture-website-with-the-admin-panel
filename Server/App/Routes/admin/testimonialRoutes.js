let express = require("express")

let testRoutes = express.Router()
const multer =require("multer")
const { testCreate,testView, testUpdate, testDelete, singletestData, statusUpdate} = require("../../controllers/admin/testimonialControler")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/test')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
})
const upload = multer({ storage: storage })

// const upload = multur({dest: 'uploads/catagory'})
testRoutes.post("/create",upload.single('testImage'),testCreate)
testRoutes.get("/view",testView)
testRoutes.post("/update/:id",upload.single('testImage'),testUpdate)
testRoutes.post("/multi-delete",testDelete)
testRoutes.get("/edit-test/:id",singletestData)
testRoutes.post("/status-update",statusUpdate)

module.exports={testRoutes}