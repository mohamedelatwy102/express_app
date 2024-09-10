let User = require("../models/user.model")
let {StatusCodes, getReasonPhrase} = require("http-status-codes")
let bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")


let getAllUser = async(req,res)=> {
    
        let data = await User.find({}).select("-password")
         res.status(StatusCodes.OK).json({message : "getAllUser",data})
}

let addUser = async(req,res)=>{

    // let {userName, email, password, role} = req.body
    // bcrypt.hash(password,7, async function (err, hash) {
    //     await User.insertMany({
    //         userName : userName,
    //         email : email,
    //         password : hash,
    //         role : role 
    //     })
    // });
    // res.status(StatusCodes.OK).json({message : "addUser"})
    let {userName, email, password, role} = req.body
    try {
        let user = await User.findOne({email: email})
    if (user) {
        res.status(StatusCodes.UNAUTHORIZED).json({message : "the email already found you must be register with another email",code : getReasonPhrase(StatusCodes.UNAUTHORIZED)})
    }else {
        let newUser = new User({
            userName,
            email,
            password,
            role

        })
        await newUser.save()
        res.status(StatusCodes.OK).json({message : "addUser"})
    }
    } catch {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : (error)=> console.log(error)})
    }
    var token = jwt.sign({email : email }, 'shhhhh');
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth: {
          user: "mohamedelatwy@std.mans.edu.eg",
          pass: "qopf aksl cumz iaha",
        },
      });
      await transporter.sendMail({
        from: '"Elatwy Company " <mohamedelatwy@std.mans.edu.eg>', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `to confirm this email <a href='http://localhost:8000/verifyUser?token=${token}'> click here</a>`, // html body
      });
}

let updateUser = async(req,res)=>{
    let {email} = req.body
    let _id = req.params.id
    // await User.updateOne({_id},{email: email})
    // await User.updateMany({email : email})
    await User.findByIdAndUpdate({_id},{email : email})
    res.status(StatusCodes.OK).json({message : "updateUser"})
}

let deleteUser = async(req,res)=>{
    let _id = req.params.id
    await User.findByIdAndDelete(_id)
    res.json({message : "deleteUser"})
}
let login = async(req,res)=> {
    let {email,password} = req.body
    try {
    let user = await User.findOne({email:email})
    if (user) {
        if (user.isAuth) {
            const match = await bcrypt.compare(password, user.password)
        if (match) {
            var token = jwt.sign({email : user.email , _id : user._id , role : user.role }, 'shhhhh');
            res.status(StatusCodes.OK).json({message : "login scusess",token})
        }else {
            res.status(StatusCodes.BAD_REQUEST).json({message : "wrong Password"})
        }
        }else {
            res.status(StatusCodes.UNAUTHORIZED).json({message : "Please verify your email first"})
        }
    }else {
        res.status(StatusCodes.BAD_REQUEST).json({message : "you must be register first"})
    }
    }catch {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : (error)=> console.log(error)})
    }
}
let verifyUser = async(req,res) => {
    let token = req.query.token
    console.log(token)
    
    let decodedEmail = jwt.verify(token,'shhhhh')
    console.log(decodedEmail)
    let user = await User.findOne({email : decodedEmail.email})
    if (user) {
        await User.updateOne({email : decodedEmail.email},{isAuth : true})
        res.json({message : "verified"}) 
    }else {
        res.json({message : "not allowed"})
    }
}

module.exports = {
    getAllUser ,
    addUser,
    updateUser,
    deleteUser,
    login,
    verifyUser
}

