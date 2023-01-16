//This is the middleware, that will restrict the access to specific 
//endpoints only to authenticated users.
module.exports = {
    authenticationProxy: (req, res, next) => {

        //For the case of passport authentication
        if(req.user) return next()
        
        //We imitation the passport deserialise user method
        //for the username / password login method
        if(req.session.passport) {

            req.user = req.req.session.passport.user
            return next()
        }
        //We dont allow unauthorised users to reach endpoints that
        //are subject to this middleware.
        res.send('You are not authorised')
    }
}