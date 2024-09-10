const mongoose = require("mongoose")

module.exports = async() => {
    return await mongoose.connect(process.env.CONNECTION_STRING).then(()=> console.log("mongo run")).catch(()=> console.log("error During connect to the database"))
}