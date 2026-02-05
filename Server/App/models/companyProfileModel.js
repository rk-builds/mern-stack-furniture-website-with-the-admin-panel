let mongoose = require("mongoose")
companySchema= mongoose.Schema(
  {

    logoImage:String,

    name:{
      type:String,
      minLength:2,
      maxLength:30,
      required:true,
      // unique:true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    phone:{
      type:String,
      required:true,
      unique:true,

    },

    address:{
      type:String,
      required:true,
      
    },

    mapUrl:{
      type:String,
      required:true,
    }
    

   

  }
)
let companyModel =mongoose.model("company",companySchema);
module.exports={companyModel}