let mongoose = require("mongoose")
let contactUsSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        shipping_mobile_no:Number,
        mobile:Number,
        subject:String,
        message:String
    }
)

let contactUsModel = mongoose.model("contact_us", contactUsSchema)

module.exports = { contactUsModel }