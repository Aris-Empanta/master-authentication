const express = require("express")
const router = express.Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/login/success', (req, res) => {
     res.send('Successfully authenticated')
                
})

router.get('/login/failed', (req, res) => {

    res.send('login failed')
})

router.get('/logout', (req, res) => {
    //we delete req.user
    req.logout()
    res.send('session destroyed')
})

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/login/success',
    failureRedirect: '/login/failed'
}))

module.exports = router