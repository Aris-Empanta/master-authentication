
const express = require("express")
const router = express.Router()

//The route to check if a session/cookie of a user's 
//exists for the requesting client.
router.get('/', (req, res ) => {  

    res.send(req.user)
 })


module.exports = router