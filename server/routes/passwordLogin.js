const express = require("express")
const router = express.Router()
const db = require("../database/db")
const bcrypt = require('bcrypt');

//we authenticate the session after every request
router.post('/login', (req, res) => {

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
  
                                              //If credentials are correct and a session is created, 
                                              //we pass the user's id to the session
                                              if(req.session) { 
                                                               req.session.user = rows[0].id
                                                               res.send('Successfully authenticated') 
                                                               }                                           
                                            })
                                              
                              } 
                            )
                      })

//Once user requests to logout, the server clears the client's cookie
//and deletes the session from the database
router.delete('/logout', (req, res) => {

        req.session.destroy( err => {
                                        if(err) return res.send(err.message)
                                        res.clearCookie('connect.sid');
                                        res.send('session destroyed')
                                        })
                                    })                                                                       


module.exports = router