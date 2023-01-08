const session = require('express-session')
//Unless I import db, the session will not be stored to the database.
//probably this has to do with the 'express-mysql-session' package.
const db = require("../database/db")
//importing mysql session store (whee we store the sessions)
const MySQLStore = require('express-mysql-session')(session);

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

module.exports = sessionStore