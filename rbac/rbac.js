const RBAC = require('easy-rbac')
let opts = require("./policy/index")


const rbac = RBAC.create(opts)

module.exports = rbac

