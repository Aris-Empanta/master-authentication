const express = require("express")
const router = express.Router()
const db = require("../database/db")
const bcrypt = require('bcrypt');

//we authenticate the session after every request
router.post('/login', (req, res, done) => {

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


                                                               //imitating passport's user serialization, so that 
                                                               //there is no confucion in data fetching with google auth
                                                               req.session.passport = {user : { 
                                                                                                id: rows[0].id,
                                                                                                name: rows[0].username 
                                                                                              }}
                                                                
                                                               res.send(req.session.passport.user) 
                                                               }                                           
                                            })
                                              
                              } 
                            )
                      })      
                      
router.put('/set-new-password', async (req, res) => {

    const email = req.body.email
    const newPassword = req.body.newPassword

    try {

      let saltRounds = 10;
      //We hash the password and then save it to the database.
      const hashedPassword = await bcrypt.hash( newPassword, saltRounds)
   

      let query = `UPDATE users
                  SET password = ?
                  WHERE email = ?`

      db.query( query, 
                [ hashedPassword, email ], 
                (err) => {
                           if(err) {
                                
                              console.log('Error: ' + err.message)
                              return res.send('An error occured in the server')
                           }

                           res.send('New password saved successfully!')
                })
      }
      catch (err) {
  
        console.log('Error: ' + err.message)
        return res.send('An error occured in the server')
      }
})


module.exports = router