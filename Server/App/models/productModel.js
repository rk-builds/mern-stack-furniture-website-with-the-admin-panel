let mongoose = require("mongoose")
let productSchema = mongoose.Schema(
    {
        productName: {
            required: [true, 'product Name Is required'], 
            type: String,
            minLength: 2,
            maxLength: 30,
            unique: true,
        },
        parentCategory: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'category'
        },
        subCategory: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'subCategory'
        },
        subSubCategory: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'subSubCategory'
        },
        productMeterial: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'matirial'
            }
        ],
        productColor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'color'
            }
        ],
        productType: {
            type: String,
            enum: ['Featured', 'New Arrivals', 'Onsale']
        },

        productImage: String,
        backImage: String,
        productGallery: Object,
        bestSelling: Boolean,
        topRated: Boolean,
        upSell: Boolean,
        actualPrice: Number,
        salePrice: Number,
        inStocks: Number,
        productOrder: Number,
        productDesc: String,
        slug: String,
        productStatus: {
            type: Boolean,
            default: true
        }
    }
)
let productModel = mongoose.model("product", productSchema)
module.exports = { productModel }