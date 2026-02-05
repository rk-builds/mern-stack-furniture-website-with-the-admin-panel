let mongoose = require("mongoose")
let cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        productId: String,
        productQty: Number,
        productImg: String,
        productPrice: Number,
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "category",
        //     required: true,
        // },
        title: String
    }
)

let cartModel = mongoose.model("cart", cartSchema)

module.exports = { cartModel }