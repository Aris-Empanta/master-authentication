const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
const db = require('../database/db')
const verificationCode = require('../functions/verificationCode').verificationCode

router.post('/', (req, res) => {

    const email = req.body.email
    
    //First we will search the database to see if the email exists
    const searchForEmail = `SELECT * 
                            FROM users
                            WHERE email = ? `

    db.query(searchForEmail, email, (error, user) => {

       //Handling server/database error
       if(error) {
                   console.log(error.message)
                   return res.send('There is an internal server error. Please try again later') 
                }

       //Handling non existing email
       if(user.length === 0) return res.send(`There is no user with email ${ email }`)

       let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: 465,
                secure: true, 
                auth: {
                user: process.env.ADMIN_MAIL, 
                pass: process.env.ADMIN_MAIL_PASS, 
            },
         })
         
       const code = verificationCode() 

       transporter.sendMail({
            from: process.env.ADMIN_MAIL,
            to: email, 
            subject: "VERIFICATION CODE", 
            html: code     
          }, (err) => { 
            
            //Handling server/database error
            if(err) {
                        console.log(err.message)
                        return res.send('There is an internal server error. Please try again later') 
                     }

            //Message successfully sent         
            res.send("Your message has been successfully sent!")                        
          })     
     
    })    
})

module.exports = router;