import { startLoadBar, completeLoadBar } from "./loading"
import { showNegativeResponse, hideAllResponses, showPositiveResponse } from "./responseMessage"

//The function to send the code to the backend, which will compare it to 
//see if it matches with the one it sent to us.
export const sendVerificationCode = async (axios, verificationCode, email, setUserVerified) => {

    const restorePassword = document.getElementById('restorePassword')
    const submitCode = document.getElementById('submitCodeWrapper')

    //We hide all previous response messages.
    hideAllResponses()

    //Blue bar starts loading on top 
    startLoadBar()

    try {

        const userData = { 
                          code: verificationCode, 
                          email: email 
                         }

        const response = await axios.post( 'http://localhost:5000/get-verification-code/compare-verification-code',
                                           userData )
        

        if(response.data === "Wrong code!") { 
            //Blue bar on top completes loading
            completeLoadBar()
            return setTimeout( () => showNegativeResponse("Wrong verification code"), 500 )
        }

        //Blue bar on top completes loading
        completeLoadBar()

        submitCode.style.display = 'none'
        restorePassword.style.display = 'initial'
        setUserVerified(true)
    } catch (error) {

        //Blue bar on top completes loading
        completeLoadBar()
        setTimeout( () => showNegativeResponse(error.message), 500 )
    }
}

//The function to change password.
export const setNewPassword = async (axios, userVerified, email, password, confirmedPassword, navigate) => {

    //We hide all previous response messages.
    hideAllResponses()
       
    if(userVerified) {

        //Blue bar starts loading on top 
        startLoadBar()

        if(password.length < 7 ) { 

            //Blue bar on top completes loading
            completeLoadBar()
            
            return setTimeout( () => showNegativeResponse('Your password should be at least 7 characters long!'), 500) 
        }
        
        if( password !== confirmedPassword) { 

            //Blue bar on top completes loading
            completeLoadBar()

            return setTimeout( () => showNegativeResponse('passwords dont match!') , 500) 
        }
        
        const userCredentials = {  
                                  email: email,
                                  newPassword: password 
                                }
       try {

            const response = await axios.put( 'http://localhost:5000/register/set-new-password', 
                                             userCredentials )

            //Blue bar on top completes loading
            completeLoadBar()

            if(response.data !== 'New password saved successfully!') {
                

                return  setTimeout( () => showNegativeResponse(response.data), 500)                 
            }

            setTimeout( () => showPositiveResponse(response.data), 500)

            setTimeout( () => navigate('/login', { replace: true }), 1500 )                       
        }
        catch (error) {

            //Blue bar on top completes loading
            completeLoadBar()

            setTimeout( () => showNegativeResponse(error.message), 500)
        }
    }
}