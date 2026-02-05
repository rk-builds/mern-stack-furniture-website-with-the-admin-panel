const { transporter } = require("../../config/mailConfig");
let userOtp= new Map();
const bcrypt = require('bcrypt');
const { userAuthModel } = require("../../models/userModel");
const saltRounds = 10;
let jwt = require('jsonwebtoken');
const { adminAuthModel } = require("../../models/adminAuthModel");
const { contactUsModel } = require("../../models/contactUsModel");



let sendOtp = async (req, res) => {

  let { userEmail } = req.body
  
  let OTP = Math.floor(100000 + Math.random() * 900000);
  // let OTP = Number((Math.random() * 99999999).toString().split(".").slice(0, 6))

  userOtp.set(userEmail, OTP);

  console.log("OTP saved for", userEmail, OTP);
  // Send an email using async/await

  const info = await transporter.sendMail({
    from: '"Monsta Web" <kothariruchi95@gmail.com>',
    to: userEmail,
    subject: "MONSTA | OTP, Your OTP Code – Verification Required",
    text: `Your OTP for account verification is ${OTP} . This code is valid for 10 minutes. Please do not share it with anyone.`,

    html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
    <div style="max-width:500px;margin:40px auto;background:#ffffff;padding:30px;border-radius:10px;text-align:center;">
      <h2 style="color:#333;">OTP Verification</h2>
      <p style="color:#555;font-size:14px;">
        Use the OTP below to verify your account. This code is valid for 10 minutes.
      </p>
      <div style="margin:20px 0;font-size:24px;font-weight:bold;letter-spacing:5px;color:#2563eb;">
        ${OTP}
      </div>
      <p style="font-size:12px;color:#888;">
        Do not share this code with anyone.
      </p>
    </div>
  </body>
</html>
`

  });




  let obj = {
    status: 1,
    msg: "user otp send"
  }

  res.send(obj)
}



let createUser = async (req, res) => {
  let { userName, userEmail, phone, password, otp } = req.body;

  let verifyOtp = userOtp.get(userEmail);

  // console.log("Saved OTP:", verifyOtp);
  // console.log("User OTP:", otp);

  if (!verifyOtp) {
    return res.send({
      status: 0,
      msg: "OTP expired or not found"
    });
  }

  if (Number(otp) !== Number(verifyOtp)) {
    return res.send({
      status: 0,
      msg: "Please fill correct OTP"
    });
  }

  const hash = bcrypt.hashSync(password, saltRounds);

  let userObj = {
    userName,
    userEmail,
    phone,
    password: hash
  };

  // console.log("Saving user:", userObj);


  let user = await userAuthModel(userObj);
  let userRes = await user.save();

  // OTP delete after success
  userOtp.delete(userEmail);

  res.send({
    status: 1,
    msg: "User created successfully",
    userRes
  });
};

let userLogin = async (req, res) => {
    let { userEmail, password } = req.body
    let user = await userAuthModel.findOne({ userEmail })
    let userObj
    if (user) {
        let userPassword = await user.password
        if (bcrypt.compareSync(password, userPassword)) {
            let token = jwt.sign({ id: user._id }, process.env.TOKENKEY);
            userObj = {
                status: 1,
                msg: "Login Successfully..!",
                user,
                token
            }

        } else {
            userObj = {
                status: 0,
                msg: "User Password Is Incorrect..!"
            }
        }
    } else {
        userObj = {
            status: 0,
            msg: "User Email Is Incorrect..!"
        }
    }

    res.send(userObj)
}

let userGoogleLogin = async (req, res) => {
    let { userEmail, userName } = req.body

    let chkEmail = await userAuthModel.findOne({ userEmail: userEmail })
    let obj
    if (chkEmail) {
        let token = jwt.sign({ id: chkEmail._id }, process.env.TOKENKEY);
        obj = {
            status: 0,
            msg: "Already Exist..!",
            data: chkEmail,
            token
        }
    } else {
        let insObj = {
            userName: userName,
            userEmail: userEmail,
            userPhone: "",
            userPassword: ""
        }
        let userCollectons = await userAuthModel(insObj)
        let insRes = await userCollectons.save()
        let token = jwt.sign({ id: insRes._id }, process.env.TOKENKEY);
        obj = {
            status: 1,
            msg: "Added Successfully..!",
            data: insRes,
            token
        }
    }

    res.send(obj)
}

let userChangePassword = async (req, res) => {
    let { id, cur_password, new_password, cnf_password } = req.body
    console.log(req.body)
    let chkPassword = await userAuthModel.findOne({ _id: id }).select('password')
    console.log("chkpass=",chkPassword)
    let userPassword = await chkPassword.password
    console.log("usepass=",userPassword)
    let obj
    if (bcrypt.compareSync(cur_password, userPassword)) {
        if (new_password == cnf_password) {
            const hash = bcrypt.hashSync(new_password, saltRounds) // new password hash
            let upd = await userAuthModel.updateOne(
                {_id:id},
                {
                    $set:{password:hash}
                }
            )

            obj = {
                status:1,
                msg:"Password Change Successfully..!",
                upd
            }

        } else {
            obj = {
                status: 0,
                msg: "New Password and Confirm Password is not matched..!"
            }
        }

    } else {
        obj = {
            status: 0,
            msg: "Current Password is invalid..!"
        }
    }

    res.send(obj)
}

let saveProfileBilling = async (req, res)=>{
    let {id} = req.body
    
    let updObj = {
        billingName:req.body.billingName,
        billingEmail:req.body.billingEmail,
        billingMobile:req.body.billingMobile,
        billingAddress:req.body.billingAddress,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        
    }
    let updRes = await userAuthModel.updateOne(
        {_id:id},
        {
            $set:{
                billingAddrerss:updObj
            }
        }
    )

    let obj = {
        status:1,
        msg:"Updated Billing Address..!",
        updRes
    }
    res.send(obj)
}

let saveProfileShipping = async (req, res)=>{
    let {id} = req.body
    let updObj = {
        shippingName:req.body.shippingName,
        shippingEmail:req.body.shippingEmail,
        shippingMobile:req.body.shippingMobile,
        shippingAddress:req.body.shippingAddress,
        shippingCountry:req.body.shippingCountry,
        shippingState:req.body.shippingState,
        shippingCity:req.body.shippingCity
    }
    let updRes = await userAuthModel.updateOne(
        {_id:id},
        {
            $set:{
                shippingAddress:updObj
            }
        }
    )
    let obj = {
        status:1,
        msg:"Updated Shipping Address..!",
        updRes
    }
    res.send(obj)
}

let profileView = async (req, res) => {
    let {id} = req.body
    let data = await userAuthModel.findOne({_id:id}).select('billingAddrerss shippingAddress')
    let obj = {
        status:1,
        data
    }

    res.send(obj)
}

//contact-us

let userContactUsDataSave = async (req, res) => {
    let { email, message } = req.body
    let adminCollection = await adminAuthModel.find()
    let adminEmail = await adminCollection[0].email

    let contactUsCollection = await contactUsModel(req.body)
    let insRes = await contactUsCollection.save()
    const info = await transporter.sendMail({
        from: `"MONSTA" <${email}>`,
        to: adminEmail,
        subject: "MONSTA | CONTACT-US",
        text: "Contact-Us", // plain‑text body
        html: `<b>Message-${message}</b>`, // HTML body
    });


    let obj = {
        status: 1,
        msg: "Insert Successfully..!",
        insRes
    }

    res.send(obj)
}

module.exports = { sendOtp,createUser, userLogin, userGoogleLogin,userChangePassword,saveProfileBilling,saveProfileShipping,profileView,userContactUsDataSave,}