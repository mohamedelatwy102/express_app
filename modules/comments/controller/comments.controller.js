let Comments = require("../model/comments.model")
let Blog = require("../../blogs/model/blog.model")
const { StatusCodes } = require("http-status-codes")
let addComments = async(req,res) => {
    let {content,blogId,userId} = req.body
    let result = await Comments.insertMany({
        content : content,
        userId : userId,
        // blogId : blogId
    })
    console.log(result);
    
    let blog = await Blog.findOne({_id : blogId})
    if (blog) {
        let newCommentsArr = [...blog.comments,result._id]
        let updateBlog = await Blog.updateOne({_id:blogId},{comments : newCommentsArr})
        res.json({messaeg : "addComments",updateBlog})
    }else {
        res.status(StatusCodes.BAD_REQUEST).json({message : "Sorry.. we didn't find the blog"})
    }
}

module.exports = addComments