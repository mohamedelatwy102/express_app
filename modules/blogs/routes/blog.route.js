const app = require("express").Router()
const multer  = require('multer')
const path = require("path")
let {getAllBlogs,addBlog,updateBlog,deleteBlog} = require("../controller/blog.controller")
let {addBlogSchema} = require("../joi/blogJoi")
let validator = require("../../../validation/common.validator")
let {ADD_BLOG} = require("../endpoints")
let authorization = require("../../../isAuthorized/authorization")
app.get("/getAllBlogs",getAllBlogs)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      const prefix = Date.now() 
      cb(null, prefix + file.originalname)
    }
  })
  
  
  function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (file.mimetype == "image/png") {
      cb(null, true)
    }
    else {
      cb(null, false)
    }
    // To reject this file pass `false`, like so:
    
  
    // To accept the file pass `true`, like so:

  
  }
  const upload = multer({ storage: storage,fileFilter })
app.post("/addBlog",authorization(ADD_BLOG),upload.single("blogImg"),addBlog)

app.put("/updateBlog/:id",updateBlog)

app.delete("/deleteBlog/:id",deleteBlog)


module.exports = app