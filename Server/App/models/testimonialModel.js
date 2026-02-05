let mongoose = require("mongoose")
testSchema= mongoose.Schema(
  {

    testImage:String,

    testName:{
      type:String,
      minLength:2,
      maxLength:50,
      require:true,
      // unique:true,
    },
    
    testRating:{
      type:Number,
      minLength:0,
      maxLength:5,
      require:true,
      // unique:true,
    },
    testDesignation:{
      type:String,
      minLength:2,
      maxLength:50,
      require:true,
      // unique:true,
    },
     testMessage:{
      type:String,
      minLength:2,
      maxLength:500,
      require:true,
      // unique:true,
    },
    

    testOrder:{
      type:Number,
      require:true,
      unique:true,
    },
    testStatus:{
      type:Boolean,
      default:true,
    }

  }
)
let testModel =mongoose.model("testimonials",testSchema);
module.exports={testModel}