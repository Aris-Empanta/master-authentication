const express = require("express")
const router = express.Router()
const controller = require("../controllers/verificationCode")

//The route to send a verification code to a user, and save it in the database.
router.post('/', controller.sendVerificationCode )

//The route to compare the users verification code input to the one
//that we actually sent to him/her. 
router.post('/compare-verification-code', controller.compareVerificationCode )

module.exports = router;