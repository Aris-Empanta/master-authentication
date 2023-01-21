const nodemailer = require("nodemailer")
const db = require('../database/db')
const verificationCode = require('../functions/verificationCode').verificationCode
const bcrypt = require('bcrypt')

module.exports = {
    sendVerificationCode: (req, res) => {

        const email = req.body.email
        
        //First we will search the database to see if the email exists
        const searchForEmail = `SELECT * 
                                FROM users
                                WHERE email = ? `
    
        db.query(searchForEmail, email, async (error, user) => {
    
           //Handling server/database error
           if(error) {
                       console.log(error.message)
                       return res.send('The service is unavaillable now. please try again later')
                    }
    
           //Handling non existing email
           if(user.length === 0) return res.send(`There is no user with email ${ email }`)      
    
           //The random verification code  
           const code = verificationCode() 
           try {
    
            //We hash the verification code 
            const saltRounds = 10;
            const hashedCode = await bcrypt.hash(code, saltRounds )       
    
            if(!hashedCode) return res.send('The service is unavaillable now. please try again later')
    
            let transporter = nodemailer.createTransport({
                                      host: process.env.MAIL_HOST,
                                      port: 465,
                                      secure: true, 
                                      auth: {
                                      user: process.env.ADMIN_MAIL, 
                                      pass: process.env.ADMIN_MAIL_PASS, 
                                  },
                              })
    
            transporter.sendMail({
                  from: process.env.ADMIN_MAIL,
                  to: email, 
                  subject: "VERIFICATION CODE", 
                  html: code     
                }, 
                (err) => { 
                  
                  //Handling server/database error
                  if(err) {
                            console.log(err.message)
                            return res.send('The service is unavaillable now. please try again later')
                          }
    
                //We will save the code to the database hashed
    
                const saveVerificationCode = `UPDATE users
                                              SET verificationCode = ? 
                                              WHERE email = ?`
                db.query( saveVerificationCode, 
                          [ hashedCode, email ], 
                          (err, rows) => {
    
                            //Handling server/database error
                            if(err) {
                              console.log(err.message)
                              return res.send('The service is unavaillable now. please try again later')
                            }
    
                            //Message successfully sent, and code saved to the database         
                            res.sendStatus(201)
                          } )                      
              })     
            }
            catch(err) {
     
            return res.send('Server related error: '+ err.message)
           }
         
        })    
    },
    compareVerificationCode: async (req, res) => {
      
        const clientsCode = req.body.code
        const email = req.body.email
  
        const query = `SELECT verificationCode
                       FROM users
                       WHERE email = ?`
                       
        db.query( query, 
                  email,  
                  async (err, rows) => {
  
                  //Handling server/database error
                  if(err) {
  
                    console.log(err.message)
                    return res.send('The service is unavaillable now. please try again later')
                   }
  
                  let hashedCode = rows[0].verificationCode
  
                  try {                
                  
                    //We compare the hashed code with the client's 
                    const isCodeCorrect = await bcrypt.compare( clientsCode, hashedCode )
                    
                    if(!isCodeCorrect) return res.send("Wrong code!")                                      
  
                    res.sendStatus(200) 
                  } 
                  catch(err) {
  
                    return res.send('Server related error: '+ err.message)
                  }
                })
  }
}