import { startLoadBar, completeLoadBar } from "./loading"
import { serverHost } from "../variables/serverHost"
import { waitingResponse, 
         showPositiveResponse, 
         showNegativeResponse } from "./responseMessage"


//The function to login with username and password
export const loginUser = async (axios, username, password, setUser) => { 
    
    waitingResponse()
    startLoadBar()

    try {
        const response = await axios.post( serverHost + 'username-password/login', {
                                                                                      username: username,
                                                                                      password: password
                                                                                    }, 
                                                                                    { 
                                                                                      withCredentials: true 
                                                                                    })
        completeLoadBar()       

        //If the user is authenticated, and there is a user id and
        //name, we set the user state true to login, and we keep the 
        //trainer's name in the local storage and state.
        if ( response.data.id )  { 

           showPositiveResponse("Successfully authenticated!")

           return setTimeout( () => {
                                        setUser(true)
                                     }
                                    , 1000) 
                                }

        setUser(false)

        showNegativeResponse(response.data) 
    } catch (error) {

        //Handling client-server connection error
        completeLoadBar()
        
        showNegativeResponse(error.message) 
    }
} 


//The function to login with google account
export const googleLogin = () => {

    window.open( serverHost + 'auth/google', '_self')
  }