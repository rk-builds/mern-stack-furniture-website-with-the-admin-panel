let mongoose = require("mongoose")
materialSchema= mongoose.Schema(
  {
    materialName:{
      type:String,
      minLength:2,
      maxLength:50,
      require:true,
      unique:true,
    },
    materialOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    materialStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let materialModel =mongoose.model("matirial",materialSchema);
module.exports={materialModel}