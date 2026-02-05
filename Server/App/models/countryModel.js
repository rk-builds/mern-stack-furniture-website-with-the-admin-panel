let mongoose = require("mongoose")
countrySchema= mongoose.Schema(
  {
    countryName:{
      type:String,
      minLength:2,
      maxLength:40,
      required:true,
      unique:true,
    },
    
    countryOrder:{
      type:Number,
      required:true,
      unique:true,
    },
    countryStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let countryModel =mongoose.model("country",countrySchema);
module.exports={countryModel}