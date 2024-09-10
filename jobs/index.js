let dailyEmail = require("./dailyEmail")
let weeklyReport = require("./weeklyReport")



const jobs = ()=> {
    dailyEmail()
    weeklyReport()
}

module.exports = jobs