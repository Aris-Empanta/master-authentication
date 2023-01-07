const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const db = require("./database/db")
const bcrypt = require('bcrypt');

//importing mysql session store (whee we store the sessions)
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

//Setting the cross-origin policy
app.use(cors({
  credentials:true,           
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  
  origin: ['http://localhost:3000']
}))
//The configuration to parse receiving data to JSON
app.use(express.json());
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

//Importing routes
//ATTN! Routes should be initialized as middlewares after setting
//all the other middlewares, as if they were in this module.
const registerRoutes = require("./routes/register")
const passwordLogin = require("./routes/passwordLogin")
//Initializing routes middleware
app.use("/register", registerRoutes)
app.use('/username-password', passwordLogin)

//we authenticate the session after every request
app.post('/login', (req, res) => {

  const username = req.body.username
  const password = req.body.password

  let query = 'SELECT * FROM users WHERE username = ?'

  db.query( query, 
            username, 
            (err, rows) => {   
                            //Handling internal server error  
                            if(err) return res.send(err)

                            //Handling non existing user
                            if(rows.length === 0) return res.send('User doesnt exist')

                            //The hashed password from the database
                            const hash = rows[0].password

                            //Comparing the actual hashed password with the one that user put
                            bcrypt.compare(password, 
                                           hash, 
                                           (err, correct) => { 

                                            //Handling internal server error  
                                            if(err) return res.send(err)

                                            //Handling wrong password
                                            if(!correct) return res.send('Wrong password')    

                                            //If credentials are correct, we pass the user's 
                                            //id to the session
                                            req.session.user = rows[0].id
                                            res.send(req.session)                                           
                                          })
                                            
                            } 
                          )
                    })
  


app.delete('/logout', (req, res) => {
  
  req.session.destroy( err => {
                                if(err) return res.send(err.message)
                                res.clearCookie('connect.sid');
                                res.send('session destroyed')
                                })
                              });

app.listen(5000, () => console.log("app is listening to port 5000"))