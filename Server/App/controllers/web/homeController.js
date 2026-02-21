const { categoryModel } = require("../../models/categoryModel");
const { productModel } = require("../../models/productModel");
const { sliderModel } = require("../../models/sliderModel");
const { testModel } = require("../../models/testimonialModel");


let getHomeCategory = async (req, res) => {
    let data = await categoryModel.find().select('categoryName')
    let obj = {
        status:1,
        data
    }
    res.send(obj);
}

let getProductByCategory = async (req, res) => {
    let {pid} = req.params
    let data = await productModel.find({parentCategory:pid,status:true}).populate("parentCategory","categoryName")
    let obj = {
        imgPath:process.env.PRODUCTIMAGEPATH,
        status:1,
        data
    }
    res.send(obj)
}

let getSlider  = async (req, res) => {
    let data = await sliderModel.find({sliderStatus:true}).select("sliderImage")
    let obj = {
        imgPath:process.env.SliderIMAGEPATH,
        status:1,
        data
    }
   
    res.send(obj)
}

let getBestSalingProduct = async (req, res) => {
    let datas = await productModel.find({status:true,bestSelling:1}).populate("parentCategory","categoryName")
    let obj = {
       status:1,
       imgPath:process.env.PRODUCTIMAGEPATH,
       datas 
    }

    res.send(obj)
}

let getProductsByType = async (req, res) => {
  try {
    const { type } = req.query   // Featured / New Arrivals / Onsale

    let filter = { productStatus: true }

    if (type) {
      filter.productType = type
    }

    console.log(filter)
    console.log("Query:", req.query)



    let datas = await productModel
      .find(filter)
      .populate("parentCategory", "categoryName") 

    res.send({
      status: 1,
      imgPath: process.env.PRODUCTIMAGEPATH,
      datas
    })

  } catch (err) {
    console.log("❌ Error:", err.message);
    res.send({ status: 0, message: "Something went wrong" })
  }
}

let getCustomerReview = async (req, res) => {

   let datas = await testModel.find({testStatus:true})
    let obj = {
       status:1,
       imgPath:process.env.TestimonialsIMAGEPATH,
       datas 
    }

    res.send(obj)

}





module.exports= {getHomeCategory, getProductByCategory, getSlider, getProductsByType,getBestSalingProduct,getCustomerReview}