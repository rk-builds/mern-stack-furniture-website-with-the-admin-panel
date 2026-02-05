const { subSubCategoryModel } = require("../../models/subSubCategoryModel");
const { subCategoryModel } = require("../../models/subCategoryModel");
const { categoryModel } = require("../../models/categoryModel");
const { colorModel } = require("../../models/colorModel");
const { materialModel } = require("../../models/materialModel");
const { productModel } = require("../../models/productModel");
let sluify = require("slugify");
const { mySlug } = require("../../config/slugCommonFunction");




let productCreate = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    let insertobj = { ...req.body }
    console.log(req.files);

    if (req.files) {
        if (req.files.productImage) {
            insertobj['productImage'] = req.files.productImage[0].filename
        }



        if (req.files.backImage) {
            insertobj['backImage'] = req.files.backImage[0].filename
        }



        if (req.files.productGallery) {

            insertobj['productGallery'] = req.files.productGallery.map((v) => v.filename)
        }
    }
    insertobj['slug'] = mySlug(req.body.productName);
      
    try {
        let productModelCollection = await productModel(insertobj)
        let productRes = await productModelCollection.save() //Insert
        obj = {
            status: 1,
            msg: " product Added",
            productRes
        }
        console.log(obj);
        res.send(obj)


    }
    catch (err) {
        console.log(err);
        res.send({ status: 0, errorMessage: err.message });
    }


    //     obj = {
    //         status: 0,
    //         errorMessage: err.message

    //     }
    //     res.send(obj)
    // }


}

let ProductView = async (req, res) => {
    let skip = 0
    let limit = 5
    let totpages

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    let productData = await productModel.find().skip(skip).limit(limit).populate('parentCategory', 'categoryName').populate('subCategory', 'subCategoryName').populate('subSubCategory', 'subSubCategoryName').populate('productColor', 'colorName').populate('productMeterial', 'materialName')
    let dataLength = await productModel.find()
    let obj = {
        status: 1,
        msg: "product added succesfully",
        staticPath: process.env.PRODUCTIMAGEPATH,
        productData,
        totpages: Math.ceil(dataLength.length / limit)

    }


    res.send(obj)


}

let productUpdate = async (req, res) => {
    let { id } = req.params
    let updateObj = { ...req.body }
    console.log(req.files);

    if (req.files) {
        if (req.files.productImage) {
            updateObj['productImage'] = req.files.productImage[0].filename
        }



        if (req.files.backImage) {
            updateObj['backImage'] = req.files.backImage[0].filename
        }



        if (req.files.productGallery) {

            updateObj['productGallery'] = req.files.productGallery.map((v) => v.filename)
        }
    }
    let obj
    try {
        let productRes = await productModel.updateOne(
            {
                _id: id
            },
            {
                $set: updateObj
            }
        )

        obj = {
            status: 1,
            msg: "product Updated",
            productRes

        }
        console.log(obj.productRes)
        res.send(obj)
    }
    catch (err) {
        let errorMessage = "something went wrong! please try again."; // default message

        if (err.code === 11000) {

            errorMessage = "this product is allready exist.";
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

//multiDelete


let productDelete = (req, res) => {
    let { ids } = req.body //Array
    let obj
    productModel.deleteMany({ _id: ids })
        .then((delRes) => {
            obj = {
                status: 1,
                msg: "products Deleted",
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

let singleproductData = async (req, res) => {
    let { id } = req.params;
    let productData = await productModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "",
        productData,
        staticPath: process.env.PRODUCTIMAGEPATH,
    }
    console.log(obj)
    res.send(obj)

}


//select fields api..

let parentCategory = async (req, res) => {
    CatParentRes = await categoryModel.find({ categoryStatus: true }).select('categoryName')
    let obj = {
        status: 1,
        msg: "",
        CatParentRes
    }
    res.send(obj);
}

let subCategory = async (req, res) => {
    let { parentid } = req.params
    console.log(parentid)
    let subCatParentRes = await subCategoryModel.find({ subCategoryStatus: true, parentCategory: parentid })
        .select('subCategoryName')


    let obj = {
        status: 1,
        msg: "",
        subCatParentRes
    }
    res.send(obj);
}

let getsubsubCategory = async (req, res) => {

    let { subid } = req.params
    //    let subsubcatRes = await subSubCategoryModel.find({subSubCategoryStatus:true,subCategory:subid, parentCategory:parentid })
    let subsubcatRes = await subSubCategoryModel.find({ subSubCategoryStatus: true, subCategory: subid })
        .select('subSubCategoryName')

    let obj = {
        status: 1,
        msg: "",
        subsubcatRes
    }
    res.send(obj);


}

let getColors = async (req, res) => {
    let colorData = await colorModel.
        find({ colorStatus: true })
        .select('colorName')
    let obj = {
        status: 1,
        colorData

    }

    res.send(obj)
}


let getMaterial = async (req, res) => {
    let materialData = await materialModel.
        find({ materialStatus: true })
        .select('materialName')
    let obj = {
        status: 1,
        materialData

    }
    res.send(obj)
}

let statusUpdate = async (req, res) => {

    let { ids } = req.body
    console.log(req.body);



    let updateRes = await productModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    productStatus: {
                        $not: "$productStatus"
                    }
                }
            }
        ]
    )
    let obj = {
        status: 1,
        msg: "Status updated",
        updateRes,

    }

    res.send(obj)

}

// USER PRODUCT LIST

let UserProductView = async (req, res) => {

  let { subCat, minPrice, maxPrice, page = 1 } = req.body;

  let limit = 12;
  let skip = (page - 1) * limit;

  let filter = {
    productStatus: true,
    inStocks: { $gt: 0 }
  };

  if (subCat) {
    filter.subCategory = subCat;
  }

  if (minPrice || maxPrice) {
  filter.salePrice = {};
  if (minPrice) filter.salePrice.$gte = Number(minPrice);
  if (maxPrice) filter.salePrice.$lte = Number(maxPrice);
}

  let productData = await productModel
    .find(filter)
    .skip(skip)
    .limit(limit)
    .populate('subCategory', 'subCategoryName');




  let total = await productModel.countDocuments(filter);

  res.send({
    status: 1,
    staticPath: process.env.PRODUCTIMAGEPATH,
    productData,
    totalPages: Math.ceil(total / limit)
  });
};




module.exports = { parentCategory, subCategory, getsubsubCategory, getColors, getMaterial, productCreate, ProductView, singleproductData, productUpdate, productDelete, statusUpdate, UserProductView }