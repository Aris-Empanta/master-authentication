const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const sessionStore = require('./session_store/storeConfigs')

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
  secret: 'keyboard cat',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
}));

//Importing routes
//ATTN! Routes should be initialized as middlewares after setting
//all the other middlewares, as if they were in this module.
const registerRoutes = require("./routes/register")
const passwordLogin = require("./routes/passwordLogin")

//Initializing routes middleware
app.use("/register", registerRoutes)
app.use('/username-password', passwordLogin)  

app.listen(5000, () => console.log("app is listening to port 5000"))