const { adminAuthModel } = require("../../models/adminAuthModel");
const { companyModel } = require("../../models/companyProfileModel");

let adminCreate = async (req, res) => {

    let dataObj = { ...req.body }
   
    if (req.file) {
        dataObj["profileImage"] = req.file.filename
    }


    let adminData = await adminAuthModel.find()
    if (adminData.length == 0) {
        let adminCollections = await adminAuthModel(dataObj)
        let insRes = await adminCollections.save()
        let obj = {
            status: 1,
            msg: "Inserted Successfully..!",
            insRes
        }
        res.send(obj)
    } else {
        let updRes = await adminAuthModel.updateOne(
            {
                $set: dataObj
            }
        )
        let obj = {
            status: 1,
            msg: "Update Successfully..!",
            updRes
        }
        res.send(obj)
    }
}

let adminView = async (req, res) => {
    let data = await adminAuthModel.find()
    if (data.length > 0) {
        let obj = {
            status: 1,
            staticPath:process.env.ADMINPROFILE,
            data
        }
        res.send(obj)
    }else{
        let obj = {
            status: 0,
            msg:"Data Not Found..!"
        }
        res.send(obj)
    }

}


let adminAuthLogin = async (req, res) => {
    let { email, password } = req.body
    console.log(req.body);
    
    let admin = await adminAuthModel.findOne({ email, password })
    let obj;
    if (admin) {
        obj = {
            status: 1,
            msg: "Login Successfully..!",
            admin,
        }
    } else {
        obj = {
            status: 0,
            msg: "Invalid Username and password..!",
            admin,

        }
    }

    res.send(obj)
}

let adminChkId = async (req, res) => {
    try {
        let { id } = req.params
        let chkId = await adminAuthModel.findOne({ _id: id })
        let obj
        if (chkId) {
            obj = {
                status: 1,
                id
            }
        } else {
            obj = {
                status: 0,
                msg: "Invalid id"
            }
        }
        res.send(obj)
    } catch (err) {
        obj = {
            status: 0,
            err
        }
        res.send(obj)
    }

}

let adminChangePassword = async (req, res) => {
    let { id } = req.params
    console.log(req.body)

    const { currentPassword, newPassword, confirmPassword } = req.body
    

    let admin = await adminAuthModel.findOne({ _id: id, password: currentPassword })
    let obj;
    if (admin) {
        let updRes = await adminAuthModel.updateOne(
            { _id: id },
            { $set: { password: newPassword } }
        )
        obj = {
            status: 1,
            msg: "Password changed successfully..!",
            updRes
        }
    } else {
        obj = {
            status: 0,
            msg: "Invalid old password..!"
        }
    }

    res.send(obj)
}

let saveCompanyProfile = async (req, res) => {
    let data = await companyModel.inserOne(req.body)
    let obj;
    if (data.length > 0) { 
        obj = {
            status: 1,
            staticPath:process.env.COMPANYLOGOPATH,
            data
      }
    } else {
        obj = { 
            status: 0,
            msg: "Data not found..!"
      }
}
}

module.exports = { adminAuthLogin,adminChkId,adminChangePassword,adminCreate,adminView,saveCompanyProfile }
