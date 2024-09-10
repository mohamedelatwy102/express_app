let app = require("express").Router()
let addComments = require("../controller/comments.controller")
// app.get("/getComments",getComments)
app.post("/addComments",addComments)


module.exports = app