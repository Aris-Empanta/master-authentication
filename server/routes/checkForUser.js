const express = require("express")
const router = express.Router()

//The route to check if a session/cookie of a user's 
//exists for the requesting client.
router.get('/', (req, res ) => {  
    
    //The case we use passport google authentication.
    if (req.session.passport) return res.send(req.session.passport.user) 

    res.send('There is no established session')
 })


module.exports = router