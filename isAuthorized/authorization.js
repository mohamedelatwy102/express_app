let jwt = require("jsonwebtoken")
let rbac = require("../rbac/rbac")
const { StatusCodes, getReasonPhrase } = require("http-status-codes")

module.exports = (endpoint)=> {
    return async(req,res,next) => {
        let token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token,'shhhhh')
        req.user = decoded
        let isAllowed = await rbac.can(decoded.role,endpoint)
        console.log(isAllowed)
        if (isAllowed) {
            next()
        }else {
            res.status(StatusCodes.UNAUTHORIZED).json({message : getReasonPhrase(StatusCodes.UNAUTHORIZED)})
        }
    }
}