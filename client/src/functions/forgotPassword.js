//We send a request to the server to receive a verification code in our email.
export const getVerificationCode = async (axios, email, setHaveCode) => {

        const response = await axios.post('http://localhost:5000/get-verification-code', { email: email})

        if(response.status !== 201) {

          return alert(response.data) 
        }
        //Once the server successfully send the code, we set the haveCode state to true,
        //to proceed to the next component where we can change our password.
        setHaveCode(true) 
        
        //we save the email to the local storage to use in the next component, where
        //we will enter new paaword, since we dont have a session.
        localStorage.setItem('email', email)        
}