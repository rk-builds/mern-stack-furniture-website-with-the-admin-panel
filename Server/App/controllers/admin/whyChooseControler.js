const { whyChooseModel } = require("../../models/whyChooseModel");

//insert
let whyChooseCreate=async(req,res)=>{

   let insertObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      insertObj['whyChooseImage']=req.file.filename;
     
     }
   }
  let obj;
  try {
    let whyChoosedata = await whyChooseModel(insertObj);
    let whyChooseRes = await whyChoosedata.save() //insert
    
    obj = {
      status: 1,
      msg: "whyChoose Added succesfully.",
      whyChooseRes,
    }

    res.send(obj)
  }
  catch (err) {
    console.log(err)
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this whyChoose is allready exist.";
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




let whyChooseView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }


  whyChooseRes = await whyChooseModel.find().skip(skip).limit(limit)
  let dataLength =await whyChooseModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    staticPath:process.env.WhyChooseIMAGEPATH,
    whyChooseRes,
    totpages:Math.ceil(dataLength.length/limit) 
    
  }

  res.send(obj)

}

//update
let whyChooseUpdate = async (req, res) => {
 
  let { id } = req.params
  let updateObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      updateObj['whyChooseImage']=req.file.filename;
     
     }
   }
  
  let obj
  try {
    let whyChooseRes = await whyChooseModel.updateOne(
      {
        _id: id
      },
      {
        $set: updateObj
      }
    )

    obj = {
      status: 1,
      msg: "whyChoose Updated",
      whyChooseRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subwhyChoose is allready exist.";
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


let whyChooseDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  whyChooseModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "whyChooses Deleted",
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

let singlewhyChooseData=async(req,res) =>{
  let {id} = req.params;
  let whyChooseData = await whyChooseModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    whyChooseData,
    staticPath:process.env.whyChooseIMAGEPATH
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  whyChooseModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   whyChooseStatus:{
                    $not:"$whyChooseStatus"
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

module.exports = {whyChooseCreate,whyChooseView,singlewhyChooseData,whyChooseDelete,statusUpdate,whyChooseUpdate}