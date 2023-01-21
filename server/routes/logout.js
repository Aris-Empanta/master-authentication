const express = require("express")
const router = express.Router()
const controller = require("../controllers/logout")

//Once user requests to logout, the server clears the client's cookie
//and deletes the session from the database
router.delete('/', controller.logout) 

module.exports = router