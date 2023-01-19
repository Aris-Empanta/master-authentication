//The function to login with username and password
export   const loginUser = async (axios, username, password, setUser) => { 

    const response = await axios.post('http://localhost:5000/username-password/login', {
                                                                                        username: username,
                                                                                        password: password
                                                                                    }, 
                                                                                    { 
                                                                                        withCredentials: true 
                                                                                    })
    
        
    //If the user is authenticated, and there is a user id and
    //name, we set the user state true to login, and we keep the 
    //trainer's name in the local storage and state.
    if ( response.data.id )  return setUser(true) 

    setUser(false)
    
    alert(response.data)
} 


//The function to login with google account
export const googleLogin = () => {

    window.open('http://localhost:5000/auth/google', '_self')
  }