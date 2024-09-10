let role = require("../../enums/role")
let adminPolicy = require("./adminPolicy")
let userPolicy = require("./userPolicy")

const opts = {
    [role.ADMIN] : {
        can : adminPolicy
    },
    [role.USER] : {
        can : userPolicy
    }
}

module.exports = opts