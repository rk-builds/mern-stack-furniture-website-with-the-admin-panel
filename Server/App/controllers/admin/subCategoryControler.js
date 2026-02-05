const { subCategoryModel } = require("../../models/subCategoryModel");
const { categoryModel } = require("../../models/categoryModel");

//insert
let subCategoryCreate=async(req,res)=>{

   let insertObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      insertObj['subCategoryImage']=req.file.filename;
     
     }
   }
  let obj;
  try {
    let subCategorydata = await subCategoryModel(insertObj);
    let subCategoryRes = await subCategorydata.save() //insert
    
    obj = {
      status: 1,
      msg: "subCategory Added succesfully.",
      subCategoryRes,
    }

    res.send(obj)
  }
  catch (err) {
    console.log(err)
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subCategory is allready exist.";
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




let subCategoryView =async(req,res)=>{
   let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }

  subCategoryRes = await subCategoryModel.find().skip(skip).limit(limit).populate('parentCategory',"categoryName")
   let dataLength =await subCategoryModel.find()
  let obj = {
    status: 1,
    msg: "",
    staticPath:process.env.SUBCATEGORYIMAGEPATH,
    subCategoryRes,
    totpages:Math.ceil(dataLength.length/limit)
  }

  res.send(obj)

}

//update
let subCategoryUpdate = async (req, res) => {
  let { id } = req.params
  let updateObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      updateObj['subCategoryImage']=req.file.filename;
     
     }
   }
  console.log(updateObj)
  let obj
  try {
    let subCategoryRes = await subCategoryModel.updateOne(
      {
        _id: id
      },
      {
        $set: updateObj
      }
    )

    obj = {
      status: 1,
      msg: "subCategory Updated",
      subCategoryRes
      
    }
    console.log(obj.subCategoryRes)
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subCategory is allready exist.";
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


let subCategoryDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  subCategoryModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "subCategorys Deleted",
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

let singlesubCategoryData=async(req,res) =>{
  let {id} = req.params;
  let subCategoryData = await subCategoryModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    subCategoryData,
    staticPath:process.env.SUBCATEGORYIMAGEPATH,
  }

  res.send(obj)
}


let parentCategory=async(req,res)=>{
   CatParentRes = await categoryModel.find({categoryStatus:true}).select('categoryName')
   let obj = {
    status: 1,
    msg: "",
    CatParentRes
  }
     res.send(obj);
}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  subCategoryModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   subCategoryStatus:{
                    $not:"$subCategoryStatus"
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


module.exports = {subCategoryCreate,subCategoryView,parentCategory,singlesubCategoryData,subCategoryUpdate,subCategoryDelete,statusUpdate}