import axios from 'axios'
import { useState } from 'react'

export const ForgotPassword = ({ setHaveCode }) => {

    const [ email, setEmail ] = useState('')

    const getVerificationCode = async () => {

        const response = await axios.post('http://localhost:5000/get-verification-code', { email: email})

        if(response.status !== 201) {

           return alert(response.data) 
        }
        
         setHaveCode(true) 
         
         //we save the email to the local storage to use in the next component
         localStorage.setItem('email', email)        
    }

    return(<div>
              <input type='email' onChange={ e => setEmail(e.target.value)}/>
             <button onClick={ getVerificationCode }>Get code</button> 
           </div>)
}