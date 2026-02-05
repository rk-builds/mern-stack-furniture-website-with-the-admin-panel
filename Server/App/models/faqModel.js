let mongoose = require("mongoose")
faqSchema= mongoose.Schema(
  {
    faqQue:{
      type:String,
      minLength:5,
      maxLength:180,
      require:true,
      unique:true,
    },
    faqAns:{
      type:String,
      minLength:5,
      maxLength:800,
      require:true,
      unique:true,
    },
    faqOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    faqStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let faqModel =mongoose.model("Faq",faqSchema);
module.exports={faqModel}