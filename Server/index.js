let express = require("express")
require("dotenv").config()
let app = express()
let cors = require("cors")
let mongoose = require("mongoose")
const { adminRoutes } = require("./App/Routes/admin/adminRoutes")
const { adminAuthModel } = require("./App/models/adminAuthModel")
const { webRoutes } = require("./App/Routes/website/webRouts")

app.use(cors())
app.use(express.json())

//web:
app.use("/web",webRoutes)
//admin:

app.use("/admin", adminRoutes)

app.use('/uploads/category', express.static('uploads/category'))
app.use('/uploads/subCategory', express.static('uploads/subCategory'))
app.use('/uploads/subSubCategory', express.static('uploads/subSubCategory'))
app.use('/uploads/products', express.static('uploads/products'))
app.use('/uploads/whyChoose', express.static('uploads/whyChoose'))
app.use('/uploads/test', express.static('uploads/test'))
app.use('/uploads/slider', express.static('uploads/slider'))
app.use('/uploads/adminprofile', express.static('uploads/adminProfile'))
mongoose.connect(process.env.DBCONECTIONURL)
  .then(async (res) => {

    app.listen(process.env.PORT)

    let data = await adminAuthModel.find()
    if (data.length == 0) {
      await adminAuthModel.insertOne(
        {
          name: 'admin',
          email: 'kothariruchi95@gmail.com',
          password: 'admin@123',
          phone: '8888444555'
        }
      )
    }
    console.log("server start")
  })
