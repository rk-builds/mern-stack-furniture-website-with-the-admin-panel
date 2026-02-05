const orderModel = require("../../models/orderModel");
// const Razorpay = require('razorpay');
// var instance = new Razorpay({
//    key_id: 'rzp_test_WAft3lA6ly3OBc',
//    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
//  });

let saveOrder=async (req,res)=>{
   let orderObj={...req.body}
   
   let {id,...orData}=orderObj
   console.log(req.body);
   
    if(orData.paymentMethod==1){
        //COD
        orData['orderStatus']="process"
        orData['userId']=id
        let order=await orderModel(orData)
        await order.save()
        res.send("hello")
    }
    else{
        //Online payment
        //Step DB Order Create
        orData['orderStatus']="process"
        orData['userId']=id
        orData['paymentStatus']=1
        let order=await orderModel(orData)
        let dbRes=await order.save() //Object
        let orderId=dbRes._id

        //razor Order Create
         let orderObj={
            "amount": orData.orderAmount*100,
            "currency": "INR",
            "receipt": orderId
        }
        let ordersRes=await instance.orders.create(orderObj)
        //Update ORDER ID
       
        let updateRes=await orderModel.updateOne(
            {_id:orderId},
            {$set:{
                razorpayOrderId:ordersRes.id //razor pay order Id
            }}
        
        )
        console.log(ordersRes);
        
        res.send(ordersRes)
      
        
    }
    
}

module.exports={saveOrder}