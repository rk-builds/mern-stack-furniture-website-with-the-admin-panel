const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const { adminRoutes } = require("./App/Routes/admin/adminRoutes")
const { adminAuthModel } = require("./App/models/adminAuthModel")
const { webRoutes } = require("./App/Routes/website/webRouts")

const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use("/web", webRoutes)
app.use("/admin", adminRoutes)

// static folders
app.use('/uploads/category', express.static('uploads/category'))
app.use('/uploads/subCategory', express.static('uploads/subCategory'))
app.use('/uploads/subSubCategory', express.static('uploads/subSubCategory'))
app.use('/uploads/products', express.static('uploads/products'))
app.use('/uploads/whyChoose', express.static('uploads/whyChoose'))
app.use('/uploads/test', express.static('uploads/test'))
app.use('/uploads/slider', express.static('uploads/slider'))
app.use('/uploads/adminprofile', express.static('uploads/adminProfile'))

// DB connect (NO listen here)
mongoose.connect(process.env.DBCONECTIONURL)
  .then(async () => {
    let data = await adminAuthModel.find()
    if (data.length === 0) {
      await adminAuthModel.create({
        name: 'admin',
        email: 'kothariruchi95@gmail.com',
        password: 'admin@123',
        phone: '8888444555'
      })
    }
    console.log("DB connected")
  })
  .catch(err => console.log("DB error", err))

//  THIS IS THE KEY LINE FOR VERCEL
module.exports = app
