const express = require("express")
const app = express()
// app.use(express.json())
require('dotenv').config()

// const nodemailer = require("nodemailer")
// var cron = require('node-cron')
// const multer  = require('multer')
app.use("/uploads",express.static("uploads"))
// let jobs = require("./jobs/index")
// jobs()
// const upload = multer({ dest: 'uploads/' })
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       const prefix =  Math.round(Math.random() * 1E9)
//       cb(null, prefix + file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })
let connection = require("./connection/config")
connection()
const userRoute = require("./modules/users/routes/user.route")
app.use(userRoute)
app.use(require("./modules/blogs/routes/blog.route"))
app.use(require("./modules/comments/routes/comments.route"))
app.get("/",async(req,res)=> {
//     const transporter = nodemailer.createTransport({
//         service : "gmail",
//         auth: {
//           user: "mohamedelatwy@std.mans.edu.eg",
//           pass: "qopf aksl cumz iaha",
//         },
//       });
//       await transporter.sendMail({
//         from: '"Elatwy Family " <mohamedelatwy@std.mans.edu.eg>', // sender address
//         to: "mohamedelatwy99@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<div style='color:blue;text-align:center;'>Hello world?</div>", // html body
//       });
//     res.json({message : "Welcome To the Home Page"})
// })

// app.post("/profileImage",upload.single("avatar"),(req,res)=> {
//     console.log(req.file)
//     console.log(req.body);
//      res.json({message : "profileImage"})

// cron.schedule('* * */23 * * *', () => {
//   console.log('running every two Second');
// });
res.json({message : "Hello from Home Page"})
})

app.listen(3000 || process.env.PORT,()=> {
    console.log("Hello From The server");
})