import axios from 'axios'
import { useState } from 'react'

export const ForgotPassword = () => {

    const [ email, setEmail ] = useState('')

    const getVerificationCode = () => {

        axios.post('http://localhost:5000/get-verification-code', { email: email})
             .then( res => alert(res.data))
    }

    return(<div>
              <input type='email' onChange={ e => setEmail(e.target.value)}/>
             <button onClick={ getVerificationCode }>Get code</button> 
           </div>)
}