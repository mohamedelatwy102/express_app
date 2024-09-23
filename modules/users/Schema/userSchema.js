let mongoose = require("mongoose")
let bcrypt = require("bcrypt")

let userSchema = new mongoose.Schema({
    userName : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    
    role : {type : String , required : true},
    isAuth : {type : Boolean , default : false},
    googleID : String
})

userSchema.pre("save", async function(next) {
    this.password =  await bcrypt.hash(this.password,7)
    next()
})
module.exports = userSchema