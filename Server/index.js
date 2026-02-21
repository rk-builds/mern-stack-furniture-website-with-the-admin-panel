const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const { adminRoutes } = require("./App/Routes/admin/adminRoutes");
const { adminAuthModel } = require("./App/models/adminAuthModel");
const { webRoutes } = require("./App/Routes/website/webRouts");
const { testRoutes } = require("./App/Routes/admin/testimonialRoutes");


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

app.get("/", (req , res)=>{
  res.send({
    status:true ,
    message : "apin started"
  })
})
 

app.get("/debug-db", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        message: "Database not connected",
        readyState: mongoose.connection.readyState
      });
    }

    const dbName = mongoose.connection.name;
    const host = mongoose.connection.host;

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    res.json({
      databaseName: dbName,
      host: host,
      collections: collections.map(c => c.name)
    });

  } catch (error) {
    res.status(500).json({
      message: "Debug Error",
      error: error.message
    });
  }
});


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
        email: 'kothariruchi95@gmail.com',
        password: 'admin@123',
        phone: '8888444555'
      });
    }

  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
