const { sliderModel } = require("../../models/sliderModel");


//insert
let sliderCreate=async(req,res)=>{

   let insertObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      insertObj['sliderImage']=req.file.filename;
     
     }
   }
  let obj;
  try {
    let sliderdata = await sliderModel(insertObj);
    let sliderRes = await sliderdata.save() //insert
    
    obj = {
      status: 1,
      msg: "slider Added succesfully.",
      sliderRes,
    }

    res.send(obj)
  }
  catch (err) {
    console.log(err)
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this slider is allready exist.";
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




let sliderView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }


  sliderRes = await sliderModel.find().skip(skip).limit(limit)
  let dataLength =await sliderModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    staticPath:process.env.SliderIMAGEPATH,
    sliderRes,
    totpages:Math.ceil(dataLength.length/limit) 
    
  }

  res.send(obj)

}

//update
let sliderUpdate = async (req, res) => {
 
  let { id } = req.params
  let updateObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      updateObj['sliderImage']=req.file.filename;
     
     }
   }
  
  let obj
  try {
    let sliderRes = await sliderModel.updateOne(
      {
        _id: id
      },
      {
        $set: updateObj
      }
    )

    obj = {
      status: 1,
      msg: "slider Updated",
      sliderRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subslider is allready exist.";
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


let sliderDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  sliderModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "sliders Deleted",
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

let singlesliderData=async(req,res) =>{
  let {id} = req.params;
  let sliderData = await sliderModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    sliderData,
    staticPath:process.env.SliderIMAGEPATH
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  sliderModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   sliderStatus:{
                    $not:"$sliderStatus"
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

module.exports = {sliderCreate,sliderView,singlesliderData,sliderDelete,statusUpdate,sliderUpdate}