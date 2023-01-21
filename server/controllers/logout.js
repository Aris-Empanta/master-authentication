module.exports = {
    logout: (req, res) => {

        req.session.destroy( err => {
                                        if(err) return res.send(err.message)
                                        
                                        res.clearCookie('connect.sid');
                                        res.send('session destroyed')
                                        })
                                    }
}