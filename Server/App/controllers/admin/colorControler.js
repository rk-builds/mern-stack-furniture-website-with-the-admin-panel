const { colorModel } = require("../../models/colorModel");


//insert
let colorCreate = async (req, res) => {
  //=> (this method is use if the fields name in req.body and models are different)
  // [let colorInsertObject={
  //   colorName:req.body.cname,
  //   colorCode:"#0000",
  //   colorOrder:"1",
  //   colorStatus:true,
  // }
  // let colorRes= await colorModel.insertOne(colorInsertObject);]
  let obj;
  try {
    let colorCollection = await colorModel(req.body);
    let colorRes = await colorCollection.save() //insert
    // colorRes=await colorModel.insertOne(req.body) : 2nd method to insert
    obj = {
      status: 1,
      msg: "color Added succesfully.",
      colorRes,
    }

    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this color is allready exist.";
    }

    else if (err.name === "ValidationError") {
       
      errorMessage = "please check for required .";
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
//view

let colorView = async (req, res) => {

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }
   let searchobj ={}
  if (req.query.searchBox && req.query.searchBox.trim() !== ""){
    searchobj={
      $or:[
        {colorName:{$regex:req.query.searchBox,$options: "i"}},
        {colorCode:{$regex:req.query.searchBox,$options: "i"}},
      ]
    }
  }  
      
    
  

  // if(req.query.page){
  //   limit=(req.query.limit)
  // }

  let colorData = await colorModel.find(searchobj).skip(skip).limit(limit)
  let colorDataLength =await colorModel.find(searchobj)
  console.log(colorDataLength)

  let obj = {
    status: 1,
    msg: "",
    colorData,
    totpages:Math.ceil(colorDataLength.length/limit) ,
  
  } 

  console.log(totpages)

  res.send(obj)
}

//update

let colorUpdate = async (req, res) => {
  let { id } = req.params

  let obj
  try {
    let colorRes = await colorModel.updateOne(
      {
        _id: id
      },
      {
        $set: req.body
      }
    )

    obj = {
      status: 1,
      msg: "Color Updated",
      colorRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this color is allready exist.";
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
//delete

let colorDelete = (req, res) => {
  let { id } = req.params
  let obj
  colorModel.deleteOne({ _id: id })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "Color Delete",
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
//multiDelete

let multiDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  colorModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "Colors Deleted",
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

let singleData=async(req,res) =>{
  let {id} = req.params;
  let colorData = await colorModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    colorData,
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  let updateRes=await  colorModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   colorStatus:{
                    $not:"$colorStatus"
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

   // second method:
//    for(let id of ids){
//         //Data Get ->Old Status
//         let oldata=await colorModel.findOne({_id:id})
//         let currentStatus=oldata.colorStatus
//          await colorModel.updateOne({_id:id},{$set:{
//             colorStatus:!currentStatu
//          }})
//    }

res.send(obj)

}

module.exports = { colorCreate, colorView, colorUpdate, colorDelete, multiDelete,singleData,statusUpdate}