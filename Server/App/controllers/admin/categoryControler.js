const { categoryModel } = require("../../models/categoryModel");
// const { subCategoryUpdate } = require("./subCategoryControler");

//insert
let categoryCreate=async(req,res)=>{

   let insertObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      insertObj['categoryImage']=req.file.filename;
     
     }
   }
  let obj;
  try {
    let categorydata = await categoryModel(insertObj);
    let categoryRes = await categorydata.save() //insert
    
    obj = {
      status: 1,
      msg: "category Added succesfully.",
      categoryRes,
    }

    res.send(obj)
  }
  catch (err) {
    console.log(err)
    let errorMessage = "something went wrong! please try again."; // default message

    if (err.code === 11000) {

      errorMessage = "this category is allready exist.";
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




let categoryView =async(req,res)=>{

  let skip=0
  let limit=5
  let totpages

  if(req.query.page){
    skip=(req.query.page-1)*limit
  }


  categoryRes = await categoryModel.find().skip(skip).limit(limit)
  let dataLength =await categoryModel.find()
  console.log(dataLength)

  let obj = {
    status: 1,
    msg: "",
    staticPath:process.env.CATEGORYIMAGEPATH,
    categoryRes,
    totpages:Math.ceil(dataLength.length/limit) 
    
  }

  res.send(obj)

}

//update
let categoryUpdate = async (req, res) => {
 
  let { id } = req.params
  let updateObj ={...req.body};
  if(req.file){
    if(req.file.filename){

      updateObj['categoryImage']=req.file.filename;
     
     }
   }
  
  let obj
  try {
    let categoryRes = await categoryModel.updateOne(
      {
        _id: id
      },
      {
        $set: updateObj
      }
    )

    obj = {
      status: 1,
      msg: "Category Updated",
      categoryRes
    }
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


let categoryDelete = (req, res) => {
  let { ids } = req.body //Array
  let obj
  categoryModel.deleteMany({ _id: ids })
    .then((delRes) => {
      obj = {
        status: 1,
        msg: "categorys Deleted",
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

let singlecategoryData=async(req,res) =>{
  let {id} = req.params;
  let categoryData = await categoryModel.findOne({_id:id})
  let obj = {
    status: 1,
    msg: "",
    categoryData,
    staticPath:process.env.CATEGORYIMAGEPATH
  }

  res.send(obj)


}

let statusUpdate=async(req,res)=>{

  let { ids } = req.body
  console.log(req.body);

  
  
  let updateRes=await  categoryModel.updateMany(
        { _id:ids },
        [
            {
                $set:{
                   categoryStatus:{
                    $not:"$categoryStatus"
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



module.exports = {categoryCreate,categoryView,singlecategoryData,categoryDelete,statusUpdate,categoryUpdate}