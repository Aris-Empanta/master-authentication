const express = require("express")
const router = express.Router()
const controller = require("../controllers/passwordLogin")


//The route to login with username and password, without passport framework.
router.post('/login', controller.login )      
                      

module.exports = router