const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

//We initialize the google auth strategy. we check in our database if
//a user with this google client id exists. if doesnt, we save him.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
      console.log(profile) 
      cb(null, profile);
  }
));

//We pass the users id to the session object
passport.serializeUser((user, done) => {
    done(null, user)
})

//With the session id from the session object, we
//fetch the user's object from the database and save 
//it in the request object as req.user.
passport.deserializeUser((user, done) => {
    done(null, user)
})