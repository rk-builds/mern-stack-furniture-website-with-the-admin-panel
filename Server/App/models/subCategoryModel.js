let mongoose = require("mongoose")
subCategorySchema= mongoose.Schema(
  {

    subCategoryImage:String,

    subCategoryName:{
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

    subCategoryOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    subCategoryStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let subCategoryModel =mongoose.model("subCategory",subCategorySchema);
module.exports={subCategoryModel}