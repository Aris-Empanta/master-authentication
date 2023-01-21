
const express = require("express")
const router = express.Router()
const controller = require("../controllers/checkForUser")

//The route to check if a session/cookie of a user's 
//exists for the requesting client.
router.get('/', controller.checkForUser )


module.exports = router