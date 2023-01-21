const db = require("../database/db")
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports = {
    registerUser: (req, res) => {    

        //The credentials from the user
        const username = req.body.username
        const password = req.body.password
        const email = req.body.email
    
        //The query to search if the username already exists.
        //we don't want duplicate username neither email.
        const searchUserQuery = `SELECT username 
                                FROM users
                                WHERE username = ? OR email = ?`
    
        //If the user doesnt exist, we proceed to the registration
        db.query( searchUserQuery, 
                  [ username, email ], 
                  async (err, result) => {
    
                    //Handling error related to server/database
                    if(err) { 
    
                        console.log("Error : " + err.message)
                        return res.send('A server related error occured. Please try again later')
                    }
    
                   //The case of existing user
                   if(result.length > 0) {
                        
                     return res.send('User already exists')
                   }                
    
                   try {
    
                        let saltRounds = 10;
    
                        //We generate a user's unique id
                        const userId = uuid.v4()
    
                        //We hash the password and then save it to the database.
                        const hashedPassword = await  bcrypt.hash( password, saltRounds)
    
                        let saveUserQuery = `INSERT INTO users 
                                             (username, password, id, email ) 
                                             VALUES( ?, ?, ?, ?)`
    
                        //We save the hashed password along with the other user's
                        //info to the database
                        db.query( saveUserQuery,
                                [ username, hashedPassword, userId, email ], 
                                (err) => {   
    
                                    if(err) { 
                                        console.log("Error : " + err.message)
                                        return res.send('A server related error occured. Please try again later')
                                    }
                                    res.send('Your registration has been successfuly made!')
                                }
                                ) 
    
                   }
                   catch(error) {
                 
                       console.log(error.message)
                       return res.send('A server related error occured. Please try again later')                
                   }                         
                })
    },
    setNewPassword: async (req, res) => {

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
    }
}