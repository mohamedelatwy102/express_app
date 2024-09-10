let Comments = require("../model/comments.model")

let addComments = async(req,res) => {
    let {content,blogId,userId} = req.body
    let result = await Comments.insertMany({
        content : content,
        userId : userId,
        blogId : blogId
    })
    res.json({messaeg : "addComments",result})
}

module.exports = addComments