const { countryModel } = require("../../models/countryModel");

//insert
let countryCreate=async(req,res)=>{

  let obj;
  try {
    let countrydata = await countryModel(req.body);
    let countryRes = await countrydata.save() //insert
    
    obj = {
      status: 1,
      msg: "country Added succesfully.",
      countryRes,
    }

    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this country is allready exist.";
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

let countryView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }

  countryRes = await countryModel.find().skip(skip).limit(limit)
  let dataLength =await countryModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    countryRes,
    totpages:Math.ceil(dataLength.length/limit) 
  }
  
  res.send(obj)

}



//update
let countryUpdate = async (req, res) => {
  let { id } = req.params

  let obj
  try {
    let countryRes = await countryModel.updateOne(
      {
        _id: id
      },
      {
        $set: req.body
      }
    )

    obj = {
      status: 1,
      msg: "country Updated",
      countryRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this country is allready exist.";
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


let countryDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  countryModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "countrys Deleted",
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

let singlecountryData=async(req,res) =>{
  let {id} = req.params;
  let countryData = await countryModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    countryData,
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  countryModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   countryStatus:{
                    $not:"$countryStatus"
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

module.exports = {countryCreate,countryView,countryUpdate,countryDelete,singlecountryData,statusUpdate}