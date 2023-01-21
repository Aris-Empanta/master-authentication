import { getVerificationCode } from '../functions/forgotPassword'
import axios from 'axios'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { LoadingBar } from "./loadingBar";
import { ResponseMessage } from "./responseMessage";
import "../css/forgotPassword.css"

export const ForgotPassword = ({ setHaveCode }) => {

    const [ email, setEmail ] = useState('')    

    return(<div id='forgotPasswordComponent'>
              <LoadingBar />
              <ResponseMessage />
              <div id='forgotPasswordWrapper'>
                <h1 className='forgotPasswordTitle'>Forgot password</h1>
                <p id='enterEmailTitle'>Enter your email to get the verification code</p>
                <div className="credentialsWrapper">
                  <input type='email' className='credentialsInputs' placeholder='Type your email'
                        onChange={ e => setEmail(e.target.value)}/>
                  <div className="credentialsIcon">
                      <FontAwesomeIcon icon={ faEnvelope } />
                  </div>
                </div>
                <button  id='getVerificationCodeButton'
                         onClick={ () => getVerificationCode(axios, email, setHaveCode) }>
                  Get code
                </button> 
                <Link to="/login" className="backToLogin">Back to login</Link>
              </div>
           </div>)
}