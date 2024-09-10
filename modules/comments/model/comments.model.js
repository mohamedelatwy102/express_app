let mongoose = require("mongoose")
let commentsSchema = require("../Schema/commentsSchema")


let Comments = mongoose.model("comment",commentsSchema)


module.exports = Comments