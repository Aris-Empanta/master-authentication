const express = require('express')
const app = express()
const cors = require('cors')
const db = require("./database/db")
const bcrypt = require('bcrypt');
//We import passport, session and strategy for the authentication
const passport = require('passport')
const session = require('express-session')
const localStrategy = require('passport-local')
//Importing routes
const registerRoutes = require("./routes/register")
//importing mysql session store
var MySQLStore = require('express-mysql-session')(session);


//The options variable holds everything that is needed to connect to the
//database
const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT 
}
//Initializing mysql sessions store
const sessionStore = new MySQLStore(options)

//The configurations to accept data from frontend
app.use(cors())
app.use(express.json());
//Initializing routes middleware
app.use("/register", registerRoutes)
//Deploying session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: { secure: true }
  }));

//The local strategy configuration
passport.use(new localStrategy( (username, password, cb) => {

    db.query('SELECT * FROM users WHERE username = ?', 
           [ username ], 
           (err, user) => { 
                            //Sql sends as back an array, so we convert it to the user's object
                            user = user[0]
                            //Handling internal server error
                            if (err) return cb(err)
                            //Handling wrong username 
                            if (!user) return cb(null, false, { message: 'Incorrect username' })
                            //If none of the above errors occurs, we proceed to password comparison
                            bcrypt.compare(password, 
                                           user.password, 
                                           (err, results) => {
                                                                //Handling internal server error
                                                                if(err) cb(err)
                                                                //Handling wrong password
                                                                if (!results) cb(null, false, { message: 'Incorrect username' })
                                                                //If the password is correct, passport sticks the user's data
                                                                //object to the session.
                                                                if(results) cb(null, user)                                           
                                                            })                                  
                                                        })
                                                    })
                                                );

//We serialize the user to the session by its id
//In the session we save only the user's id.
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user.id);
    });
  });

//User object attaches to the request as req.user.
//We retrieve the user's data by the id. 
/*
passport.deserializeUser((id, cb) => {

    let query = `SELECT username FROM users WHERE id = ?`

    db.query( query, id, (err, user) => { 
                                            if(err) throw err 
                                            cb(null, user)
                                        })
})*/
    
//we authenticate the session after every request
//app.use(passport.session())
app.post('/login', passport.authenticate('local'), (req, res) => console.log(req.user))

//app.get('/check', passport.authenticate('local'), (req, res) => sessionStore.close())


app.listen(5000, () => console.log("app is listening to port 5000"))