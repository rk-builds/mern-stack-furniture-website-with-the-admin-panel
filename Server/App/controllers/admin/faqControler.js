const { faqModel } = require("../../models/faqModel");

//insert
let faqCreate=async(req,res)=>{

  let obj;
  try {
    let faqdata = await faqModel(req.body);
    let faqRes = await faqdata.save() //insert
    
    obj = {
      status: 1,
      msg: "faq Added succesfully.",
      faqRes,
    }

    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this faq is allready exist.";
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

let faqView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }

  faqRes = await faqModel.find().skip().skip(skip).limit(limit)
  let dataLength =await faqModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    faqRes,
    totpages:Math.ceil(dataLength.length/limit) ,
  
  } 

  console.log(totpages)
  
  res.send(obj)

}

//update
let faqUpdate = async (req, res) => {
  let { id } = req.params

  let obj
  try {
    let faqRes = await faqModel.updateOne(
      {
        _id: id
      },
      {
        $set: req.body
      }
    )

    obj = {
      status: 1,
      msg: "faq Updated",
      faqRes
    }
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this faq is allready exist.";
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


let faqDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  faqModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "faqs Deleted",
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

let singlefaqData=async(req,res) =>{
  let {id} = req.params;
  let faqData = await faqModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    faqData,
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  

  let updateRes=await  faqModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   faqStatus:{
                    $not:"$faqStatus"
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
 
module.exports={faqCreate,faqView,faqDelete,faqUpdate,statusUpdate,singlefaqData}