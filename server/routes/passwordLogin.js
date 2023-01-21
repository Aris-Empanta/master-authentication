const express = require("express")
const router = express.Router()
const db = require("../database/db")
const bcrypt = require('bcrypt');

//The route to login with username and password, without passport framework.
router.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password
  
    let query = 'SELECT * FROM users WHERE username = ?'
  
    db.query( query, 
              username, 
              async (err, rows) => {   
                              //Handling internal server error  
                              if(err) return res.send(err)
  
                              //Handling non existing user
                              if(rows.length === 0) return res.send('User doesnt exist')
  
                              //The hashed password from the database
                              const hash = rows[0].password

                              try {

                                  //Comparing the actual hashed password with the one that user put
                                  const correctPassword = await bcrypt.compare(password, hash)

                                  //Handling wrong password
                                  if(!correctPassword) return res.send('Wrong password')  

                                  //imitating passport's user serialization, so that 
                                  //there is no confucion in data fetching with google auth
                                  req.session.user = { 
                                                       id: rows[0].id,
                                                       name: rows[0].username 
                                                     }
                                
                                  res.send(req.session.user) 
                              }
                              catch(error) {

                                  //Handling internal server error  
                                  if(err)  { 
                                             console.log('Error: ' + err.message)
                                             return res.send('A server related error occured. Please try again later')
                                            }
                                     }                                              
                              } 
                            )
                      })      
                      

module.exports = router