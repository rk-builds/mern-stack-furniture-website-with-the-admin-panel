let express = require("express")

const multer = require("multer")
const { adminAuthLogin, adminChangePassword, adminChkId, adminCreate, adminView } = require("../../controllers/admin/adminAuthController")
let adminAuthRoutes = express.Router()

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,"uploads/adminProfile")
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+'_'+file.originalname)
    }
})

let uploads = multer({storage:storage})

adminAuthRoutes.post('/login', uploads.none() ,adminAuthLogin)
adminAuthRoutes.put('/change-password/:id',adminChangePassword)
adminAuthRoutes.post('/create', uploads.single('profileImage') ,adminCreate)
adminAuthRoutes.get('/check-id/:id',adminChkId)
adminAuthRoutes.get('/view', adminView)
adminAuthRoutes.post('/company-profile/create', uploads.single('logoImage') ,)

module.exports = {adminAuthRoutes}