const { materialModel } = require("../../models/materialModel");

//insert
let materialCreate=async(req,res)=>{

  let obj;
  try {
    let materialdata = await materialModel(req.body);
    let materialRes = await materialdata.save() //insert
    
    obj = {
      status: 1,
      msg: "material Added succesfully.",
      materialRes,
    }

    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this material is allready exist.";
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

let materialView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }

  materialRes = await materialModel.find().skip().skip(skip).limit(limit)
  let dataLength =await materialModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    materialRes,
    totpages:Math.ceil(dataLength.length/limit) ,
  
  } 

  console.log(totpages)
  
  res.send(obj)

}

//update
let materialUpdate = async (req, res) => {
  let { id } = req.params

  let obj
  try {
    let materialRes = await materialModel.updateOne(
      {
        _id: id
      },
      {
        $set: req.body
      }
    )

    obj = {
      status: 1,
      msg: "material Updated",
      materialRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this material is allready exist.";
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


let materialDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  materialModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "materials Deleted",
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

let singleMaterialData=async(req,res) =>{
  let {id} = req.params;
  let materialData = await materialModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    materialData,
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  

  let updateRes=await  materialModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   materialStatus:{
                    $not:"$materialStatus"
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
 



// let statusUpdate = async (req, res) => {
//   let { ids } = req.body;

//   let materials = await materialModel.find({ _id: { $in: ids } });

//   let bulkOps = materials.map(item => ({
//     updateOne: {
//       filter: { _id: item._id },
//       update: { materialStatus: !item.materialStatus }
//     }
//   }));

//   let updateRes = await materialModel.bulkWrite(bulkOps);

//   res.send({
//     status: 1,
//     msg: "Status updated",
//     updateRes
//   });
// };


module.exports = {materialCreate,materialView,materialUpdate,materialDelete,singleMaterialData,statusUpdate}