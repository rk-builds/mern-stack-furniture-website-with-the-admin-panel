let mongoose = require("mongoose")
sliderSchema= mongoose.Schema(
  {

    sliderImage:String,

    sliderTitle:{
      type:String,
      minLength:2,
      maxLength:30,
      require:true,
      // unique:true,
    },

    sliderOrder:{
      type:Number,
      required:true,
      unique:true,
    },
    sliderStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let sliderModel =mongoose.model("slider",sliderSchema);
module.exports={sliderModel}