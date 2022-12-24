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
    port: process.env.PORT,
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
    saveUninitialized: true,   
  }));

//The local strategy configuration middleware
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
                                                                if(results) {
                                                                     cb(null, user)
                                                                     console.log(user)
                                                                    }                                           
                                                            })                                  
                                                        })
                                                    })
                                                );



//Persists user id (the one that we saved and auto 
//increment in the users database table) inside the session.
passport.serializeUser((user, cb) => {

      cb(null, user.id)    
  });

//Fetches the session object from the db based on the session id
//and attach all the info we need to req.user
passport.deserializeUser((id, cb) => {

  let query = `SELECT username 
               FROM users
               WHERE id = ?`

  db.query( query, id, (err, rows) =>{
                                        if(err) throw(err)

                                        let user = {
                                          'id': id,
                                          'username': rows[0].username
                                         }

                                        cb( null, user )
                                      })
                                    })
//Passport becomes a middleware to every route
app.use(passport.initialize())
//Connects passport and session
app.use(passport.session())    

//we authenticate the session after every request
app.post('/login', passport.authenticate('local'))

app.get('/check', (req, res) =>  res.send(req.user))

app.post('/logout', (req, res) => {
 
  req.session.destroy(function (err) {
    if(err) throw err 
    res.send('session closed')
    });
});


app.listen(5000, () => console.log("app is listening to port 5000"))