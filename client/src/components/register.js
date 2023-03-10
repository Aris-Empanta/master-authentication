import "../css/signup.css"
import { useState } from 'react';
import { submitCredentials } from "../functions/register";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { LoadingBar } from "./loadingBar";
import { ResponseMessage } from "./responseMessage";
import axios from 'axios'
 
export const Register = () => {
  
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmedPassword, setConfirmedPassword ] = useState("")

    const navigate = useNavigate()

    return(<div className="signupComponent">
                <LoadingBar />
                <ResponseMessage />
                <div id="signupWrapper"> 
                    <h1 className="signupTitle">Signup</h1>
                    <p className="credentialsTitles">Username</p>
                    <div className="credentialsWrapper">
                        <input type="text" placeholder="Type a username" className="credentialsInputs"
                            onChange={ (e) => setUsername(e.target.value) }/>
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faUser } />
                        </div>
                    </div>
                    <p className="credentialsTitles">Email</p>
                    <div className="credentialsWrapper">
                        <input type='email' placeholder="Type your email" className="credentialsInputs"
                            onChange={ (e) => setEmail(e.target.value) } />
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faEnvelope } />
                        </div>
                    </div>
                    <p className="credentialsTitles">Password</p>
                    <div className="credentialsWrapper">
                        <input type="password" placeholder="Enter your password"  className="credentialsInputs"
                            onChange={ (e) => setPassword(e.target.value) }/>
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faLock } />
                        </div>
                    </div>
                    <p className="credentialsTitles">Confirm password</p>
                    <div className="credentialsWrapper">
                        <input type="password" placeholder="Confirm your password"  className="credentialsInputs"
                            onChange={ (e) => setConfirmedPassword(e.target.value) }/>
                        <div className="credentialsIcon">
                            <FontAwesomeIcon icon={ faLock } />
                        </div>
                    </div>
                    <button id="signupButton"
                            onClick={ () => submitCredentials( axios, username,
                                                            email, password, 
                                                            confirmedPassword, navigate ) }>
                        Signup
                    </button>
                    <Link to="/login" className="backToLogin">Already a user? login</Link>
                </div>
           </div>)
}