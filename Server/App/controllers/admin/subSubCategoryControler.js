const { subSubCategoryModel } = require("../../models/subSubCategoryModel");
const { subCategoryModel } = require("../../models/subCategoryModel");
const { categoryModel } = require("../../models/categoryModel");
const mongoose = require("mongoose");

//insert
let subSubCategoryCreate=async(req,res)=>{

   let insertObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      insertObj['subSubCategoryImage']=req.file.filename;
     
     }
   }
  let obj;
  try {
    let subSubCategorydata = await subSubCategoryModel(insertObj);
    let subSubCategoryRes = await subSubCategorydata.save() //insert
    
    obj = {
      status: 1,
      msg: "subSubCategory Added succesfully.",
      subSubCategoryRes,
    }
   
    res.send(obj)
  }
  catch (err) {
    console.log(err)
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subSubCategory is allready exist.";
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




let subSubCategoryView =async(req,res)=>{
   let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }

  subSubCategoryRes = await subSubCategoryModel.find().skip(skip).limit(limit).populate('parentCategory','categoryName').populate('subCategory','subCategoryName')
   
  

  let dataLength =await subSubCategoryModel.find()
  let obj = {
    status: 1,
    msg: "",
    staticPath:process.env.SUBSUBCATEGORYIMAGEPATH,
    subSubCategoryRes,
    totpages:Math.ceil(dataLength.length/limit)
    
  }

  res.send(obj)

}

//update
let subSubCategoryUpdate = async (req, res) => {
  let { id } = req.params
  let updateObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      updateObj['subSubCategoryImage']=req.file.filename;
     
     }
   }
  console.log(updateObj)
  let obj
  try {
    let subSubCategoryRes = await subSubCategoryModel.updateOne(
      {
        _id: id
      },
      {
        $set: updateObj
      }
    )

    obj = {
      status: 1,
      msg: "subSubCategory Updated",
      subSubCategoryRes
      
    }
    console.log(obj.subSubCategoryRes)
    res.send(obj)
  }
  catch (err) {
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this subSubCategory is allready exist.";
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


let subSubCategoryDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  subSubCategoryModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "subSubCategorys Deleted",
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

let singlesubSubCategoryData=async(req,res) =>{
  let {id} = req.params;
  let subSubCategoryData = await subSubCategoryModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    subSubCategoryData,
    staticPath:process.env.SUBSUBCATEGORYIMAGEPATH,
  }
   console.log(obj)
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

let subCategory=async(req,res)=>{
     let {parentid} = req.params
     console.log(parentid)
     let subCatParentRes = await subCategoryModel.find({subCategoryStatus:true, parentCategory:parentid})
     .select('subCategoryName')


   let obj = {
    status: 1,
    msg: "",
    subCatParentRes
  }
     res.send(obj);
}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  subSubCategoryModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   subSubCategoryStatus:{
                    $not:"$subSubCategoryStatus"
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



    
module.exports = {subSubCategoryCreate,subSubCategoryView,parentCategory,subCategory,singlesubSubCategoryData,subSubCategoryDelete,subSubCategoryUpdate,statusUpdate}