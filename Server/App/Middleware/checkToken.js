let jwt = require('jsonwebtoken');
let checkToken = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    let resObj
    if (token) {
        let decode = jwt.verify(token, process.env.TOKENKEY)
        if (decode) {
            let { id } = decode
            req.body.id = id
            return next()
        }
    } else {
        resObj = {
            status: 0,
            error: "Plz Fill Correct Token"
        }
    }
    res.send(resObj)
}

module.exports = { checkToken }