const { StatusCodes } = require("http-status-codes")


module.exports = (schema) => {
    return (req,res,next) => {
        var validation = []
        let valiadationResult = schema.body.validate(req.body)
        if (valiadationResult.error) {
            validation.push(valiadationResult.error.details[0].message)
            if (validation.length) {
                res.status(StatusCodes.BAD_REQUEST).json({message : validation.join(" ")})
            }
        }else {
            next()
        }
        
        
    }
}