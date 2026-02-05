let mongoose = require("mongoose")
whyChooseSchema= mongoose.Schema(
  {

    whyChooseImage:String,

    whyChooseTitle:{
      type:String,
      minLength:2,
      maxLength:50,
      require:true,
      // unique:true,
    },
    
     whyChooseDes:{
      type:String,
      minLength:2,
      maxLength:500,
      require:true,
      // unique:true,
    },
    

    whyChooseOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    whyChooseStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let whyChooseModel =mongoose.model("whyChoose",whyChooseSchema);
module.exports={whyChooseModel}