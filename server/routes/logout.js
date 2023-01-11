const express = require("express")
const router = express.Router()

//Once user requests to logout, the server clears the client's cookie
//and deletes the session from the database
router.delete('/', (req, res) => {

    req.session.destroy( err => {
                                    if(err) return res.send(err.message)
                                    res.clearCookie('connect.sid');
                                    res.send('session destroyed')
                                    })
                                }) 

module.exports = router