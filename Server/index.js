const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const { adminRoutes } = require("./App/Routes/admin/adminRoutes");
const { adminAuthModel } = require("./App/models/adminAuthModel");
const { webRoutes } = require("./App/Routes/website/webRouts");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/web", webRoutes);
app.use("/admin", adminRoutes);

// static folders
app.use('/uploads/category', express.static('uploads/category'));
app.use('/uploads/subCategory', express.static('uploads/subCategory'));
app.use('/uploads/subSubCategory', express.static('uploads/subSubCategory'));
app.use('/uploads/products', express.static('uploads/products'));
app.use('/uploads/whyChoose', express.static('uploads/whyChoose'));
app.use('/uploads/test', express.static('uploads/test'));
app.use('/uploads/slider', express.static('uploads/slider'));
app.use('/uploads/adminprofile', express.static('uploads/adminProfile'));

// database + server start
mongoose.connect(process.env.DBCONECTIONURL)
  .then(async () => {

    // ✅ Render NEEDS this
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

    // create admin if not exists
    const data = await adminAuthModel.find();
    if (data.length === 0) {
      await adminAuthModel.create({
        name: 'admin',
        email: 'kothariruchi95@gmail.com',
        password: 'admin@123',
        phone: '8888444555'
      });
    }

  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });