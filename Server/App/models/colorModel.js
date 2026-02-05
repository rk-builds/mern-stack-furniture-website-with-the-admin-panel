let mongoose = require("mongoose")
colorSchema= mongoose.Schema(
  {
    colorName:{
      type:String,
      minLength:2,
      maxLength:30,
      required:true,
      unique:true,
    },
    colorCode:{
      type:String,
      minLength:2,
      maxLength:30,
      required:true,
      unique:true,
    },
    colorOrder:{
      type:Number,
      required:true,
      unique:true,
    },
    colorStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let colorModel =mongoose.model("color",colorSchema);
module.exports={colorModel}