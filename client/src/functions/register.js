import { startLoadBar, completeLoadBar } from "./loading"
import { waitingResponse, 
         showPositiveResponse, 
         showNegativeResponse } from "./responseMessage"
import { serverHost } from "../variables/serverHost"


//The function to register a user
export const submitCredentials = async (axios, username, email, password, confirmedPassword, navigate) => {

    const signupWrapper = document.getElementById("signupWrapper")

    signupWrapper.style.marginTop = "40px"

    //No empty spaces allowed
    if( username === '' || email === '' || 
        password === '' || confirmedPassword === '' ) return showNegativeResponse('Please fillup all the required fields')
    
    //Both passwords should be the same    
    if( password !== confirmedPassword ) return showNegativeResponse('Your passwords dont match!')

    //Password should be at least 7 characters long
    if(password.length < 7 ) return showNegativeResponse('Your password should be at least 7 characters long!')
    
    //If the 2 passwords match, we send the user's info to the server
    const userInfo = {
                       username: username,
                       email: email,
                       password: password
                     }

    //Loading elements while waiting response
    waitingResponse()
    startLoadBar()

    try {            

        //Send credentials to the server 
        const response = await axios.post( serverHost + 'register', userInfo )
        //Complete blue loadBar
        completeLoadBar()

        if( response.data === 'Your registration has been successfuly made!') {

            showPositiveResponse(response.data)
            return setTimeout( () => navigate('/login', { replace: true}), 1500)
        }
        showNegativeResponse(response.data)
    }
    catch (error) {
        //Complete blue loadBar
        completeLoadBar()
        
        //Handling client-server connection error
        showNegativeResponse(error.message)
    }
}