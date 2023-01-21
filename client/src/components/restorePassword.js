import { useEffect, useState } from "react"
import { sendVerificationCode, setNewPassword } from "../functions/restorePassword"
import axios from 'axios'
import '../css/restorePassword.css'
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { LoadingBar } from "./loadingBar";
import { ResponseMessage } from "./responseMessage";

export const RestorePassword = ({setHaveCode}) => {

    const [ password, setPassword ] = useState("")
    const [ verificationCode, setVerificationCode ] = useState('')
    const [ userVerified, setUserVerified ] = useState(false)
    const [ confirmedPassword, setConfirmedPassword ] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        return () => {
            //When component unmounts, we set below state to false, to erase
            //the stored email from the local storage ( see parent App component )
            setHaveCode(false)
        }
    }, [])

    const email = localStorage.getItem('email')

    return(<div id="restorePasswordComponent">
             <LoadingBar />
             <ResponseMessage />
             <div id="restorePasswordWrapper">
                <h1 className="resetPasswordTitle">Reset Password</h1>
                <div id="submitCodeWrapper">  
                    <p id="enterReceivedCode">Type the code you received in your email</p>
                    <div className="credentialsWrapper">
                        <input type='text' placeholder="Enter the verification code" 
                            className='credentialsInputs'
                            onChange={ (e) => setVerificationCode(e.target.value) } />
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faKey } />
                        </div>
                    </div>
                    <button  id="submitCodeButton"
                            onClick={ () => sendVerificationCode( axios, verificationCode, 
                                                                  email, setUserVerified) } >
                        submit code
                    </button>
                </div>
                <div id="restorePassword">
                    <p className="credentialsTitles">Password</p>
                    <div className="credentialsWrapper">
                        <input type="password" placeholder="Type your password" className="credentialsInputs"
                                onChange={ (e) => setPassword(e.target.value) }/>
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faLock } />
                        </div>
                    </div>
                    <p className="credentialsTitles">Confirm password</p>
                    <div className="credentialsWrapper">
                        <input type="password" placeholder="Confirm your password" className="credentialsInputs"
                            onChange={ (e) => setConfirmedPassword(e.target.value) }/>  
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faLock } />
                        </div>          
                    </div> 
                    <button id="resetPasswordButton"
                            onClick={ () => setNewPassword( axios, userVerified, 
                                                            email, password,  
                                                            confirmedPassword, navigate ) }>
                            Save new password
                    </button>
                </div>
                <Link to="/login" className="backToLogin">Back to login</Link>
             </div>
           </div>)
}