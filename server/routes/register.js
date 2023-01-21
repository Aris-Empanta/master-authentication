const express = require("express")
const router = express.Router()
const controller = require("../controllers/register")

//The route to register a user
router.post('/', controller.registerUser)

//The route to change password
router.put('/set-new-password', controller.setNewPassword)

module.exports = router