const { productModel } = require("../../models/productModel")


let productDetails=async (req,res)=>{
    let {slug}=req.params
    let product=await productModel.findOne({slug:slug})
    let obj={
        status:1,
         imgPath:process.env.PRODUCTIMAGEPATH,
        product
    }
    res.send(obj)
}


module.exports={productDetails}