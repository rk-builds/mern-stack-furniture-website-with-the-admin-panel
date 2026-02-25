const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const { adminRoutes } = require("./App/Routes/admin/adminRoutes");
const { adminAuthModel } = require("./App/models/adminAuthModel");
const { webRoutes } = require("./App/Routes/website/webRouts");



const app = express();

// middlewares
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000", "https://mern-stack-furniture-website-with-t.vercel.app",
    "https://mern-stack-furniture-website-with-the-admin-panel-dlxoc9bwf.vercel.app/"
  ],
  credentials: true
}))
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


console.log("Connected DB:", mongoose.connection.name);

// database + server start
mongoose.connect(process.env.DBCONECTIONURL)
  .then(async () => {

    // Render
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

    // create admin if not exists
    const data = await adminAuthModel.find();
    if (data.length === 0) {
      await adminAuthModel.create({
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin@123',
        phone: '8888444555'
      });
    }

  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
