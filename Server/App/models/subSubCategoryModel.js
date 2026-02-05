let mongoose = require("mongoose")
subSubCategorySchema= mongoose.Schema(
  {

    subSubCategoryImage:String,

    subSubCategoryName:{
      type:String,
      minLength:2,
      maxLength:30,
      require:true,
      // unique:true,
    },
    
    parentCategory:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'category' 
    },
    
    subCategory:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'subCategory' 
    },

    subSubCategoryOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    subSubCategoryStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let subSubCategoryModel =mongoose.model("subSubCategory",subSubCategorySchema);
module.exports={subSubCategoryModel}