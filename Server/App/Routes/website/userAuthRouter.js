let express = require("express")
const { sendOtp, createUser, userLogin, userGoogleLogin, userChangePassword, userContactUsDataSave, saveProfileBilling, saveProfileShipping, profileView } = require("../../controllers/web/userAuthController")
const { checkToken } = require("../../Middleware/checkToken")
let userAuthRoute = express.Router()

userAuthRoute.post("/send-otp",sendOtp)
userAuthRoute.post("/create", createUser)
userAuthRoute.post("/login", userLogin)
// userAuthRoute.get("/admin-contact-detail", adminContactDetails)
userAuthRoute.post("/contact-save", userContactUsDataSave)
userAuthRoute.post("/google-login", userGoogleLogin)
userAuthRoute.post("/change-password", checkToken, userChangePassword)
userAuthRoute.post("/save-Profile-billing", checkToken, saveProfileBilling)
userAuthRoute.post("/save-Profile-shipping", checkToken, saveProfileShipping)
userAuthRoute.post("/profile-view", checkToken, profileView)

module.exports = {userAuthRoute}

