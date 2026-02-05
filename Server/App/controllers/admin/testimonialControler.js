

const { testModel } = require("../../models/testimonialModel");

//insert
let testCreate=async(req,res)=>{

   let insertObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      insertObj['testImage']=req.file.filename;
     
     }
   }
  let obj;
  try {
    let testdata = await testModel(insertObj);
    let testRes = await testdata.save() //insert
    
    obj = {
      status: 1,
      msg: "test Added succesfully.",
      testRes,
    }

    res.send(obj)
  }
  catch (err) {
    console.log(err)
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this test is allready exist.";
    }

    else if (err.name === "ValidationError") {
       
      errorMessage = "please check for required.";
    }
    else if (err.code === 500) {
       
      errorMessage = "Internal Server Error.";
    }
    const obj = {
      status: 0,
      errorMessage,
      data: err,
    };
    res.send(obj);
  }
  
  
  
  
    
  }




let testView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }


  testRes = await testModel.find().skip(skip).limit(limit)
  let dataLength =await testModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    staticPath:process.env.TestimonialsIMAGEPATH,
    testRes,
    totpages:Math.ceil(dataLength.length/limit) 
    
  }

  res.send(obj)

}

//update
let testUpdate = async (req, res) => {
 
  let { id } = req.params
  let updateObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      updateObj['testImage']=req.file.filename;
     
     }
   }
  
  let obj
  try {
    let testRes = await testModel.updateOne(
      {
        _id: id
      },
      {
        $set: updateObj
      }
    )

    obj = {
      status: 1,
      msg: "test Updated",
      testRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subtest is allready exist.";
    }

    else if (err.name === "ValidationError") {
       
      errorMessage = "please check for required.";
    }
    else if (err.code === 500) {
       
      errorMessage = "Internal Server Error.";
    }
    const obj = {
      status: 0,
      errorMessage,
      data: err,
    };
    res.send(obj);
  }}

  //multiDelete


let testDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  testModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "tests Deleted",
        delRes
      }

      res.send(obj)
    })
    .catch((err) => {
      obj = {
        status: 0,
        err
      }
      res.send(obj)
    })
}

let singletestData=async(req,res) =>{
  let {id} = req.params;
  let testData = await testModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    testData,
    staticPath:process.env.TestimonialsIMAGEPATH
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  testModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   testStatus:{
                    $not:"$testStatus"
                   } 
                }
            }
        ]
   )
    let obj = {
        status: 1,
        msg:"Status updated",
        updateRes,
     
    }

res.send(obj)

}

module.exports = {testCreate,testView,singletestData,testDelete,statusUpdate,testUpdate}