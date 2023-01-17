import { getVerificationCode } from '../functions/forgotPassword'
import axios from 'axios'
import { useState } from 'react'
import { Link } from "react-router-dom"

export const ForgotPassword = ({ setHaveCode }) => {

    const [ email, setEmail ] = useState('')    

    return(<div>
              <input type='email' onChange={ e => setEmail(e.target.value)}/>
              <button onClick={ () => getVerificationCode(axios, email, setHaveCode) }>
                Get code
              </button> 
              <Link to="/login">Back to login</Link>
           </div>)
}