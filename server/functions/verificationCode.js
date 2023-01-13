module.exports = {
    verificationCode : () => {
        
        let code = 0
        let multiplier = 10

        while( multiplier < 100000000 ) {

            code += Math.round( Math.random() * multiplier )

            multiplier *= 10
        }
        //returns a  7 figure random verification code. We also
        //convert it to string for the HTML needed in nodemailer
        //configurations
        return code + ''
    }
}