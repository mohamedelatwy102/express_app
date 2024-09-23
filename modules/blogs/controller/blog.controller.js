const { StatusCodes } = require("http-status-codes")
let Blog = require("../model/blog.model")
const Comments = require("../../comments/model/comments.model")

let getAllBlogs = async(req,res)=> {
    // let {page , size } = req.query
    // if (!page) {
    //     page = 1
    // }if (!size) {
    //     size = 10
    // }
    // const limit = parseInt(size)
    // let skip = (page - 1) * limit
    // let data = await Blog.find({}).populate("userId","email").limit(limit).skip(skip)
    // let total_Document = await Blog.find({}).countDocuments()
    // let total_pages = Math.ceil(total_Document / limit)
    // res.json({message : "getAllBlogs",data,total_Document,total_pages})
    // let blogwithComments = []
    // let alldata = await Blog.find({}).cursor()
    // for(let doc  = await alldata.next(); doc != null ;  doc = await alldata.next()) {
    //     // console.log(doc._doc)
    //     let comments =  await Comments.find({blogId : doc._doc._id })
    //     let obj = {...doc._doc,comments}
    //     blogwithComments.push(obj)
    // }
    // let data = await Blog.find({}).populate("userId").populate({
    //     path : "comments",
    //     populate : {
    //         path : "userId",
    //         model : "user"
    //     }
    // })
    let newBlogComm = []
    let cursor =  Blog.find({}).cursor()
    for (let doc = await cursor.next(); doc != null ; doc = await cursor.next()) {
        let commentsArr = await Comments.find({blogId : doc._doc._id}).populate("userId")
        let obj = {...doc._doc,commentsArr}
        newBlogComm.push(obj)
    }
    
    res.json({message : "getAll data",newBlogComm})
    

}

let addBlog = async(req,res)=> {
    console.log(req.file.path)
    let {title,description} = req.body
    let _id = req.user._id
    console.log(req.file);
    
    if (req.file == undefined) {
        res.status(StatusCodes.UNAUTHORIZED).json({message : "the file not support"})
    }else {
        try {
            let newBlog = new Blog({
                title : title,
                description : description,
                userId : _id,
                blogImgUrl : req.file.path
            })
            await newBlog.save()
            res.status(StatusCodes.OK).json({message : "addBlogs"})
        }catch {
            res.status(StatusCodes.UNAUTHORIZED).json({message : (error) => console.log(error)})
        }
    }
    
}

let updateBlog = async(req,res)=> {
    let _id = req.params.id
    let {title} = req.body
    await Blog.findByIdAndUpdate({_id},{title})
    res.json({message : "update Blog"})
}

let deleteBlog = async(req,res)=> {
    let _id = req.params.id
    await Blog.findByIdAndDelete({_id})
    res.json({message : "delete Blog"})
}

module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog,
    deleteBlog
}