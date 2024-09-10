let mongoose = require("mongoose")


let commentsSchema = new mongoose.Schema({
    content : String,
    blogId : {type : mongoose.Schema.Types.ObjectId,ref : "blog"},
    userId : {type : mongoose.Schema.Types.ObjectId,ref : "user"}
})

module.exports = commentsSchema