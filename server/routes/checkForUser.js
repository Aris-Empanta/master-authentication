const express = require("express")
const router = express.Router()

//The route to check if a session/cookie of a user's 
//exists for the requesting client.
router.get('/', (req, res ) => {  
    //The case of using username/password method.                                  
    if (req.session.user)  return res.send(req.session.user) 
    //The case we use passport google authentication.
    if (req.session.passport.user) return res.send(req.session.passport.user) 
 })


module.exports = router