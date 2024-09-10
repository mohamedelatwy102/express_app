let mongoose = require("mongoose")
let userSchema = require("../Schema/userSchema")


let User = mongoose.model("user",userSchema)
module.exports = User