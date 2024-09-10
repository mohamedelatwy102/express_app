let mongoose = require("mongoose")
let blogSchema = require("../Schema/blogSchema")

let Blog = mongoose.model("blog",blogSchema)

module.exports = Blog