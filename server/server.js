const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const sessionStore = require('./session_store/storeConfigs')
const passport = require('passport')
const authenticationProxy = require('./middlewares/authentication').authenticationProxy
//We import google auth, as if the configurations are written in this file.
const googleAuth = require('./passport/googleAuthentication')

//Setting the cross-origin policy only for our specific frontend
app.use(cors({
  credentials:true,           
  methods: ['GET', 'POST', 'DELETE', 'PUT'],  
  origin: ['http://localhost:3000']
}))

//The configuration to parse receiving data to JSON
app.use(express.json());

//Deploying session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
}));

//Setting as a middleware the passport's 'initialize' and 'session' method.
app.use(passport.initialize())
app.use(passport.session())

//Importing routes
//ATTN! Routes should be initialized as middlewares after setting
//all the other middlewares, as if they were in this module.
const registerRoutes = require("./routes/register")
const passwordLoginRoute = require("./routes/passwordLogin")
const googleAuthRoute = require('./routes/googleAuth')
const checkForUserRoute = require('./routes/checkForUser')
const logoutRoute = require('./routes/logout')
const emailVerificationRoute = require('./routes/verificationCode') 

//Initializing routes middleware. The private user endpoints 
//will also have the "authenticationProxy" middleware
app.use("/register", registerRoutes)
app.use('/username-password', passwordLoginRoute)  
app.use('/auth' ,googleAuthRoute)
app.use('/check-for-user', authenticationProxy , checkForUserRoute)
app.use('/logout', authenticationProxy, logoutRoute )
app.use('/verification-code', emailVerificationRoute)


app.listen(5000, () => console.log("app is listening to port 5000"))