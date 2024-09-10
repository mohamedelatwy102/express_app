let mongoose = require("mongoose")

let blogSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "user"},
    blogImgUrl :  String
})

module.exports = blogSchema