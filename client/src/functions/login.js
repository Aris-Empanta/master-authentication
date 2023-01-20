import { startLoadBar, completeLoadBar } from "./loading"

//The function to login with username and password
export const loginUser = async (axios, username, password, setUser) => { 

    const positiveResponse = document.getElementById("positiveResponse")
    const negativeResponse = document.getElementById("negativeResponse")
    const waitingResponse = document.getElementById("waitingResponse") 
    const errorMessage = document.getElementById("errorMessage")    
    const successMessage = document.getElementById("successMessage")

    negativeResponse.style.display = "none" 
    positiveResponse.style.display = "none" 
    waitingResponse.style.display = "flex"
    errorMessage.innerText = ""
    successMessage.innerText = ""
    
    startLoadBar()

    try {
        const response = await axios.post('http://localhost:5000/username-password/login', {
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

            positiveResponse.style.display = "flex"
            successMessage.innerText = "Successfully authenticated!"

            return setTimeout( () => {
                                        setUser(true)
                                     }
                                    , 1000) 
                                }

        setUser(false)

        negativeResponse.style.display = "flex"    
        errorMessage.innerText = response.data 
    } catch (error) {

        completeLoadBar()

        negativeResponse.style.display = "flex"
        errorMessage.innerText = error.message
    }
} 


//The function to login with google account
export const googleLogin = () => {

    window.open('http://localhost:5000/auth/google', '_self')
  }