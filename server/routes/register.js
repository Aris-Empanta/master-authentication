const express = require("express")
const router = express.Router()
const db = require("../database/db")
const bcrypt = require('bcrypt');

//The route to register a user
router.post('/', (req, res) => {    
    //The credentials from the user
    const username = req.body.username
    const password = req.body.password
    //The query to search if the username already exists
    const searchUserQuery = `SELECT username 
                            FROM users
                            WHERE username = ?`
    //If the user doesnt exist, we proceed to the registration
    db.query( searchUserQuery, 
              username, 
              (err, result) => {
                                if(result.length > 0) {
                                    res.send('User already exists')
                                } else {

                                    let saltRounds = 10;
                                    //We hash the password and then save it to the database.
                                    bcrypt.hash( password, 
                                                 saltRounds, 
                                                 (err, hash) => {
                                                                    if(err) throw err
                                                                    let saveUserQuery = `INSERT INTO users(username, password) VALUES( ?, ? )`
                                                                    //We save the hashed password along ith the username
                                                                    db.query(saveUserQuery,
                                                                             [ username, hash ], 
                                                                             (err, rows) => {   if(err) throw err
                                                                                            res.send("Credentials saved")
                                                                                        }) 
                                                                })                                  
                                }
                            })
})

module.exports = router