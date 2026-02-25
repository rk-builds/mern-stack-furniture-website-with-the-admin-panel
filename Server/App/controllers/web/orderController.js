const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartModel");
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECKEY,
});
const crypto = require('crypto')

let saveOrder = async (req, res) => {
    let orderObj = { ...req.body }

    let { id, ...orData } = orderObj
    console.log(req.body);

    if (orData.paymentMethod == 1) {
        //COD
        orData['orderStatus'] = "process"
        orData['userId'] = id
        let order = await orderModel(orData)
        await order.save()
        res.send("hello")
    }
    else {
        //Online payment
        //Step DB Order Create
        orData['orderStatus'] = "process"
        orData['userId'] = id
        orData['paymentStatus'] = 1
        let order = await orderModel(orData)
        let dbRes = await order.save() //Object
        let orderId = dbRes._id

        //razor Order Create
        let orderObj = {
            "amount": orData.finalAmount * 100,
            "currency": "INR",
            "receipt": orderId
        }
        let ordersRes = await instance.orders.create(orderObj)
        //Update ORDER ID

        let updateRes = await orderModel.updateOne(
            { _id: orderId },
            {
                $set: {
                    razorpayOrderId: ordersRes.id //razor pay order Id
                }
            }

        )
        console.log(ordersRes);

        res.send(updateRes)


    }

}


let verifyOrder = async (req, res) => {
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature, id } = req.body

    const hmac = crypto.createHmac('sha256', 'aDJJSTqE5shPAFmp6i6Nt6f8')

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id)

    const generated_signature = hmac.digest('hex')

    if (generated_signature == razorpay_signature) {
        await orderModel.updateOne(
            {
                razorpayOrderId: razorpay_order_id
            },
            {
                $set:{

                paymentStatus: 2,
                razorpayPayment: razorpay_payment_id,
                orderStatus: 'process'
             }
           }
        )

        let cartRes = await cartModel.deleteMany({
            userId:id
        })

        res.send(
            {
                status:true,
                msg:'order verified'
                
            }
        )

}
}

module.exports = { saveOrder, verifyOrder }