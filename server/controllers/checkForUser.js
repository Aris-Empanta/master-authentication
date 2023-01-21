module.exports = {
    checkForUser: (req, res ) => {  

        res.send(req.user)
     }
}