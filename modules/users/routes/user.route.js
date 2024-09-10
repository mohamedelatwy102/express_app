const app = require("express").Router()
const {getAllUser,addUser,deleteUser,updateUser,login,verifyUser} = require("../controller/user.controller")
let authorization = require("../../../isAuthorized/authorization")
let {GET_ALL_USER}=require("../endpoints")
let validator = require("../../../validation/common.validator")
let {addUserSchema,loginSchema} = require("../joi/user.joi")
app.get("/getAllUser",authorization(GET_ALL_USER),getAllUser)
app.post("/addUser",validator(addUserSchema),addUser)
app.put("/updateUser/:id",updateUser)
app.delete("/deleteUser/:id",deleteUser)
app.post("/login",validator(loginSchema),login)
app.get("/verifyUser",verifyUser)

module.exports = app
