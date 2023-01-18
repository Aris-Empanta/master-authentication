import "../css/login.css"
import { useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { googleLogin, loginUser } from "../functions/login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Login = ({setUser, setTrainer}) => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    

    return(<div className="loginComponent">
            <div id="usernamePasswordLogin">
              <h1 id="loginTitle">User Login</h1>
              <p className="credentialsTitles">Username</p>
              <div className="credentialsWrapper">
                <input type="text" placeholder="Type your username" className="credentialsInputs"
                      onChange={ (e) => setUsername(e.target.value) }/>
                <div className="credentialsIcon">
                  <FontAwesomeIcon icon={ faUser } />
                </div>
              </div>
              <p className="credentialsTitles">Password</p>
              <div className="credentialsWrapper">
                <input type="password" placeholder="Type your password" className="credentialsInputs"
                      onChange={ (e) => setPassword(e.target.value) }/>
                <div className="credentialsIcon">
                  <FontAwesomeIcon icon={ faLock } />
                </div>
              </div>
              <Link to='/restore-password' id="forgotPassword">Forgot your password?</Link>
              <button onClick={ () => loginUser( axios, username, 
                                                 password, setUser, 
                                                 setTrainer ) }>
                 Login
              </button>           
              <p id="or">or</p>   
              <div id="googleLogin">
                <button onClick={ googleLogin } id="googleLoginButton">Login with Google</button>
              </div>
              <Link to='/signup' id="signupLink">Not a user? Signup </Link>
            </div>
           </div>)
}