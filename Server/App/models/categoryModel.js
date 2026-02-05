let mongoose = require("mongoose")
categorySchema= mongoose.Schema(
  {

    categoryImage:String,

    categoryName:{
      type:String,
      minLength:2,
      maxLength:30,
      require:true,
      // unique:true,
    },
    
    

    categoryOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    categoryStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let categoryModel =mongoose.model("category",categorySchema);
module.exports={categoryModel}