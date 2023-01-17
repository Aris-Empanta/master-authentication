//The function to send the code to the backend, which will compare it to 
//see if it matches with the one it sent to us.
export const sendVerificationCode = async (axios, verificationCode, email, setUserVerified) => {

    const restorePassword = document.getElementById('restorePassword')

    try {

        const userData = { 
                          code: verificationCode, 
                          email: email 
                         }

        const response = await axios.post( 'http://localhost:5000/get-verification-code/compare-verification-code',
                                           userData )

        if(response.status !== 200) return alert(response.data)
        console.log(response.status)

        restorePassword.style.display = 'initial'
        setUserVerified(true)
    } catch (err) {

        alert(err.message)
    }
}

//The function to change password.
export const setNewPassword = async (axios, userVerified, email, password, confirmedPassword, navigate) => {

       
    if(userVerified) {
        
        if( password !== confirmedPassword) return alert('passwords dont match!')

        const userCredentials = {  
                                  email: email,
                                  newPassword: password 
                                }
       
       const response = await axios.put( 'http://localhost:5000/username-password/set-new-password', 
                                          userCredentials )
        alert(response.data)

        navigate('/login', { replace: true })
    }
}