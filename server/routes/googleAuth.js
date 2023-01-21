const express = require("express")
const router = express.Router()
const passport = require('passport')

//The route that our frontend will redirect to authenticate with google.
router.get('/google', passport.authenticate('google', { scope: ['profile'] }) )

//The route after the authentication.
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/login'
}))

module.exports = router 