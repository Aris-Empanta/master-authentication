import { startLoadBar, completeLoadBar } from "./loading"
import { showNegativeResponse, hideAllResponses } from "./responseMessage"

//We send a request to the server to receive a verification code in our email.
export const getVerificationCode = async (axios, email, setHaveCode) => {

        //We hide all previous response messages.
        hideAllResponses()

        if(email === "") { 
          
            return showNegativeResponse("Please Enter your email") 
          }

        //Blue bar starts loading on top  
        startLoadBar()

        try {

          const response = await axios.post('http://localhost:5000/get-verification-code', { email: email})

          //Blue bar on top completes loading
          completeLoadBar()

          if(response.status !== 201) {

            return setTimeout(() => showNegativeResponse(response.data), 500) 
          }
          //Once the server successfully send the code, we set the haveCode state to true,
          //to proceed to the next component where we can change our password.
          setHaveCode(true) 
          
          //we save the email to the local storage to use in the next component, where
          //we will enter new paaword, since we dont have a session.
          localStorage.setItem('email', email)   
      }    
      catch (error) {

        //Blue bar on top completes loading
        completeLoadBar()

        setTimeout(() => showNegativeResponse(error.message), 500)
      } 
}