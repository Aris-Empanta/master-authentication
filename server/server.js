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
app.use(cors({
  credentials:true,            //access-control-allow-credentials:true
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  
  origin: ['http://localhost:3000']
}))
app.use(express.json());
//Initializing routes middleware
app.use("/register", registerRoutes)
//Deploying session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      httpOnly: false
    }
  }));

//we authenticate the session after every request
app.post('/login', (req, res) => {

  const username = req.body.username
  const password = req.body.password

  console.log(username)
  console.log(password)

  let query = 'SELECT * FROM users WHERE username = ?'

  db.query( query, 
            username, 
            (err, rows) => {   
                            if(err) res.send(err)

                            if(rows.length > 0) {

                            const hash = rows[0].password

                            bcrypt.compare(password, 
                                           hash, 
                                           (err, result) => { if(err) throw err
                                                              if(result) {

                                                                req.session.user = rows[0].id
                                                                res.send(req.session)
                                                              } else {

                                                                res.send('Wrong password')
                                                              }
                                                            })
                                            
                            } else {
                               res.send('User doesnt exist')
                            }
                          })
  
} )  
                                                                        

app.get('/check', (req, res) =>  res.send(req.session))

app.delete('/logout', (req, res) => {

  req.session.destroy( err => {
                                if(err) throw err
                                res.clearCookie('connect.sid');
                                res.send('session destroyed')
                                })
                              });


app.listen(5000, () => console.log("app is listening to port 5000"))