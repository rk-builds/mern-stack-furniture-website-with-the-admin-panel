const { cartModel } = require("../../models/cartModel")

let addToCart = async (req, res) => {
    console.log(req.body);
    let { id, pid, name, productImage, quantity, salePrice } = req.body
    let userId = id
    let cartObj = {
        productId: pid,
        productQty: quantity,
        productImg: productImage,
        productPrice: salePrice,
        title: name,
        userId
    }
   console.log(cartObj);
    let cartCollection = await cartModel(cartObj)
    let insRes = await cartCollection.save()
    let obj = {
        status: 1,
        msg: "Added Successfully..!",
        insRes
    }

    res.send(obj)
}

let cartView = async (req, res) => {
    let {id} = req.body
    // console.log(id);
    
    let data = await cartModel.find({userId:id})
    let obj = {
        status:1,
        data,
        imgPath:process.env.PRODUCTIMAGEPATH
    }
    //console.log(req.body);
    
    res.send(obj)
}


let deleteCart = async (req, res) => {
    let {cartId} = req.body //{cartId}

    
    let data = await cartModel.deleteOne({_id:cartId})
    let obj = {
        status:1,
        data
    }
    //console.log(req.body);
    
    res.send(obj)
}


module.exports = { addToCart, cartView,deleteCart }